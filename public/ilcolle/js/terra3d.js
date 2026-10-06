/* =========================================================
   TERRA 3D — vista dall'alto del territorio del Nido (riutilizzabile)
   three.js + DEM TINITALY 1.1 (INGV, CC BY 4.0) + ortofoto AGEA 2022
   (Regione Marche, CC BY 4.0, modificata).

   Come nel riferimento (Primland):
   - le nuvole quasi non si vedono: solo una foschia leggera e sfrangiata ai bordi
     dell'inquadratura, che oscilla appena avanti e indietro;
   - si vedono le loro OMBRE: un campo di nuvole continuo (rumore frattale) a quota fissa,
     proiettato sul terreno lungo la direzione del sole basso; scorre col vento, si piega sui
     rilievi e non si esaurisce mai (loop naturale, infinito);
   - stormi di uccelli in prospettiva vera: ogni uccello sta a una quota sul terreno, quindi
     dimensione e velocità apparenti dipendono dalla distanza dalla camera.

   Uso:
     const terra = await createTerra(contenitore, { base, v, camera: (meta, mobile) => ({ da, a }) });
     terra.progress(0..1), terra.pausa(bool), terra.distruggi(), terra.lento (Promise)
   Coordinate: x = est, z = sud (metri), centro area = 0,0.
   ========================================================= */
const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.min.js';

export async function createTerra(el, opts = {}) {
  const THREE = await import(THREE_URL);
  const mobile = window.matchMedia('(max-width: 767px)').matches;
  // iPhone/iPad: memoria per scheda limitata -> texture più piccole e risoluzione di disegno ridotta
  const ios = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const o = Object.assign({
    base: 'media/terra/', textureMobile: 'orto-2048.webp', textureDesktop: 'orto-3072.webp', v: '',
    esagera: 1.2,
    sole: { azimut: 262, elevazione: mobile ? 44 : 36 },  // sole basso da ovest: luce laterale
    vento: [78, 27],                                       // m/s apparenti del campo di nuvole: le ombre scorrono chiaramente
    quotaNuvole: 1400,                                     // m sul terreno medio
    copertura: 0.34,                                       // quanta parte del cielo è nuvola (ombre)
    uccelli: { stormi: 7, perStormo: 5, quote: [100, 200, 140, 170], scala: 32, velocita: 120 },
    camera: null
  }, opts);
  const q = (f) => o.base + f + (o.v ? '?v=' + o.v : '');
  const meta = await (await fetch(q('terra.json'))).json();
  const [W, H] = meta.size_m;

  // ---------- renderer
  const renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, ios ? 1.5 : mobile ? 2 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.autoClear = false;
  el.appendChild(renderer.domElement);
  Object.assign(renderer.domElement.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', display: 'block' });

  const scene = new THREE.Scene();
  const haze = new THREE.Color('#ece3cf');
  scene.background = haze;
  const camera = new THREE.PerspectiveCamera(mobile ? 46 : 38, 1, 20, 30000);

  // ---------- altimetria
  const demImg = await loadImageData(q(meta.dem.file));
  const gw = meta.dem.w, gh = meta.dem.h;
  const geo = new THREE.PlaneGeometry(W, H, gw - 1, gh - 1);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const quota = new Float32Array(gw * gh);
  for (let j = 0; j < gh; j++) for (let i = 0; i < gw; i++) {
    const k = (j * gw + i) * 4;
    quota[j * gw + i] = meta.dem.base_m + (demImg.data[k] * 256 + demImg.data[k + 1]) * meta.dem.scale;
  }
  const hMid = (meta.dem.min + meta.dem.max) / 2;
  for (let v = 0; v < pos.count; v++) pos.setY(v, (quota[v] - hMid) * o.esagera);
  geo.computeVertexNormals();
  const quotaA = (x, z) => {
    const i = Math.min(gw - 1, Math.max(0, (x / W + 0.5) * (gw - 1)));
    const j = Math.min(gh - 1, Math.max(0, (z / H + 0.5) * (gh - 1)));
    return (quota[Math.round(j) * gw + Math.round(i)] - hMid) * o.esagera;
  };

  // ---------- ortofoto
  const loader = new THREE.TextureLoader();
  const orto = await new Promise((res, rej) => loader.load(q(ios ? 'orto-ios.webp' : mobile ? o.textureMobile : o.textureDesktop), res, undefined, rej));
  orto.colorSpace = THREE.SRGBColorSpace;
  orto.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  // livello di dettaglio: ortofoto più fine su Nido, lago e Mercatale (si carica dopo la prima immagine)
  const det = meta.dettaglio;
  const vuota = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1); vuota.needsUpdate = true;
  const sunDir = new THREE.Vector3().setFromSphericalCoords(1,
    THREE.MathUtils.degToRad(90 - o.sole.elevazione), THREE.MathUtils.degToRad(o.sole.azimut)).normalize();

  const NOISE = /* glsl */`
    float h2(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
    float vn(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.-2.*f);
      return mix(mix(h2(i), h2(i+vec2(1,0)), u.x), mix(h2(i+vec2(0,1)), h2(i+vec2(1,1)), u.x), u.y); }
    float fbm(vec2 p){ float a = .5, s = 0.; mat2 r = mat2(.8,-.6,.6,.8);
      for (int i = 0; i < 5; i++){ s += a * vn(p); p = r * p * 2.03 + 17.1; a *= .5; } return s; }`;

  // ---------- terreno: luce laterale + ombre del campo di nuvole + foschia di distanza
  const uniforms = {
    uOrto: { value: orto }, uSun: { value: sunDir },
    uSunCol: { value: new THREE.Color('#fff3dc') }, uSky: { value: new THREE.Color('#aebdcb') },
    uHaze: { value: haze }, uCam: { value: new THREE.Vector3() },
    uHazeNear: { value: 2500 }, uHazeFar: { value: 9000 },
    uRes: { value: new THREE.Vector2(1, 1) },
    uT: { value: 0 }, uVento: { value: new THREE.Vector2(o.vento[0], o.vento[1]) },
    uQN: { value: o.quotaNuvole }, uCop: { value: o.copertura },
    uSat: { value: mobile ? 1.0 : .84 }, uExp: { value: mobile ? .84 : .78 },
    uDet: { value: vuota }, uDetOn: { value: 0 },
    uDetBox: { value: new THREE.Vector4(...(det ? det.box_m : [0, 0, 1, 1])) }
  };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: /* glsl */`
      varying vec2 vUv; varying vec3 vPos; varying vec3 vN;
      void main(){ vUv = uv; vPos = (modelMatrix*vec4(position,1.)).xyz; vN = normalize(normal);
        gl_Position = projectionMatrix*viewMatrix*vec4(vPos,1.); }`,
    fragmentShader: /* glsl */`
      precision highp float;
      uniform sampler2D uOrto, uDet; uniform float uDetOn; uniform vec4 uDetBox; uniform vec3 uSun, uSunCol, uSky, uHaze, uCam;
      uniform float uHazeNear, uHazeFar, uT, uQN, uCop, uSat, uExp; uniform vec2 uRes, uVento;
      varying vec2 vUv; varying vec3 vPos; varying vec3 vN;
      ${NOISE}
      float nuvola(vec2 p){                       // densità del campo di nuvole (m -> unità di rumore)
        vec2 c = (p - uVento * uT) / 820.;
        float d = fbm(c) * .75 + fbm(c * 2.7 + 9.) * .25;
        float z = (d - .48) * 6.;                                 // normalizzato: ~ -1..1
        return smoothstep(.7 - uCop * 2., 1.7 - uCop * 2., z);     // bordi morbidi e sfumati
      }
      void main(){
        vec3 base = texture2D(uOrto, vUv).rgb;
        vec2 du = (vPos.xz - uDetBox.xy) / (uDetBox.zw - uDetBox.xy);
        float inD = uDetOn * step(0., du.x) * step(du.x, 1.) * step(0., du.y) * step(du.y, 1.);
        float bordo = smoothstep(0., .06, min(min(du.x, 1. - du.x), min(du.y, 1. - du.y)));
        vec3 fine = texture2D(uDet, vec2(du.x, 1. - du.y)).rgb;
        vec3 col = pow(mix(base, fine, inD * bordo), vec3(2.2));
        vec3 n = normalize(vN);
        float lam = max(dot(n, uSun), 0.);
        vec3 qn = vPos + uSun * ((uQN - vPos.y) / uSun.y);      // risale verso il sole fino alle nuvole
        float sh = nuvola(qn.xz) * .62;   // ombre nette sul terreno chiaro
        vec3 light = (uSky * 1.05 * (.8 + .2*n.y) + uSunCol * .32) * (1. - sh * .5) + uSunCol * 1.15 * lam * (1. - sh);   // rilievo morbido, ambiente più chiaro
        col = pow(col * light, vec3(1./2.2));
        col = mix(vec3(dot(col, vec3(.3,.59,.11))), col, uSat);
        col = pow(col, vec3(uExp)) * vec3(1.08, 1.08, 1.05);
        col *= mix(vec3(1.), vec3(.50, .54, .62), sh / .62);    // ombra della nuvola: più scura e un filo più fredda
        float f = smoothstep(uHazeNear, uHazeFar, distance(vPos, uCam));
        col = mix(col, uHaze, f * .95);                         // lontano: si scioglie nella foschia (niente bordo)
        vec2 sc = gl_FragCoord.xy / uRes - .5;
        col *= 1. - .10 * smoothstep(.45, .95, length(sc));
        gl_FragColor = vec4(col, 1.);
      }`
  });
  scene.add(new THREE.Mesh(geo, mat));

  // ---------- foschia ai bordi (le nuvole quasi non si vedono): schermo intero, oscilla appena
  const fogU = { uT: { value: 0 }, uRes: uniforms.uRes, uAsp: { value: 1 } };
  const fogMat = new THREE.ShaderMaterial({
    uniforms: fogU, transparent: true, depthTest: false, depthWrite: false,
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
    fragmentShader: /* glsl */`
      precision highp float; uniform float uT, uAsp; varying vec2 vUv;
      ${NOISE}
      void main(){
        vec2 p = vUv; vec2 s = vec2(sin(uT * .032) * .013 + uT * .0015, sin(uT * .026 + 1.3) * .008);   // deriva lenta e continua + respiro lento
        vec2 g = (p + s) * vec2(uAsp, 1.) * 5.5;
        float d = fbm(g + vec2(uT * .007, uT * .0025)) * .7 + fbm(g * 2.3 - 4. + vec2(uT * .01, uT * .0035)) * .3;   // si rimescola piano
        // più presente a destra e lungo i bordi, quasi nulla al centro
        float bx = smoothstep(.62, 1.02, p.x) * 1.0 + smoothstep(.22, -.04, p.x) * .55;
        float by = smoothstep(.8, 1.02, p.y) * .7 + smoothstep(.18, -.02, p.y) * .6;
        float m = clamp(max(bx, by), 0., 1.);
        float z = (d - .48) * 6.;
        float a = smoothstep(-.5, .8, z) * m * .78;
        vec3 c = mix(vec3(.82, .81, .79), vec3(.98, .97, .94), smoothstep(-.2, 1., z));
        gl_FragColor = vec4(c, a);
      }`
  });
  const fogScene = new THREE.Scene();
  const fogMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), fogMat); fogMesh.frustumCulled = false;
  fogScene.add(fogMesh);
  const fogCam = new THREE.Camera();

  // ---------- stormi: prospettiva vera (quota sul terreno -> distanza -> dimensione e velocità apparenti)
  const U = o.uccelli, NB = U.stormi * U.perStormo;
  const bGeo = new THREE.BufferGeometry();
  const bPos = new Float32Array(NB * 2 * 3 * 3);                  // 2 ali (triangoli) per uccello
  bGeo.setAttribute('position', new THREE.BufferAttribute(bPos, 3).setUsage(THREE.DynamicDrawUsage));
  const birds = new THREE.Mesh(bGeo, new THREE.MeshBasicMaterial({ color: '#fffdf7', side: THREE.DoubleSide, depthTest: false, transparent: true, opacity: .97 }));
  // alone: stessa forma più ampia e morbida, luce chiara dietro ogni uccello (leggibile sul verde)
  const hGeo = new THREE.BufferGeometry(); const hPos = new Float32Array(bPos.length);
  hGeo.setAttribute('position', new THREE.BufferAttribute(hPos, 3).setUsage(THREE.DynamicDrawUsage));
  const alone = new THREE.Mesh(hGeo, new THREE.MeshBasicMaterial({ color: '#ffffff', side: THREE.DoubleSide, depthTest: false, transparent: true, opacity: mobile ? .32 : .2 }));
  alone.frustumCulled = false; alone.renderOrder = 4; scene.add(alone);
  birds.frustumCulled = false; birds.renderOrder = 5;
  scene.add(birds);
  const rnd = mulberry(23);
  const stormi = [];
  const SPAN = 1.25 * U.scala * (mobile ? 1.45 : 1);                                    // apertura alare in scala (stessa per tutti)
  for (let s = 0; s < U.stormi; s++) {
    const membri = [];
    for (let k = 0; k < U.perStormo; k++) {
      const lato = k === 0 ? 0 : (k % 2 ? 1 : -1) * Math.ceil(k / 2);
      membri.push({ dx: lato * SPAN * (1.6 + rnd() * .7), dz: Math.abs(lato) * SPAN * (1.5 + rnd() * .8) + rnd() * SPAN,
        dy: (rnd() - .5) * 8, fase: rnd() * 6.28, freq: 3.4 + rnd() * 1.2, plana: rnd() * 6.28 });
    }
    stormi.push({ membri, quota: U.quote[s % U.quote.length], attivo: false, attesa: s * 1.4 + rnd() * 1.5, x: 0, z: 0, dir: 0, v: 0 });
  }
  const vista = new THREE.Vector3();
  function impronta() {                                            // area di terreno inquadrata (circa)
    const d = camera.position.y - camera.userData.ty;
    const hv = d * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)), hh = hv * camera.aspect;
    return { cx: camera.userData.tx, cz: camera.userData.tz, hx: hh * 1.15, hz: hv * 1.15 };
  }
  function lancia(s) {                                             // entra da un lato, angolazione e momento diversi
    const f = impronta();
    const lato = Math.floor(rnd() * 4);
    const base = [0, Math.PI / 2, Math.PI, -Math.PI / 2][lato];    // verso: est, sud, ovest, nord
    s.dir = base + (rnd() - .5) * 1.0;
    const ux = Math.cos(s.dir), uz = Math.sin(s.dir);
    const t = (rnd() - .5) * 1.4;
    s.x = f.cx - ux * f.hx * 1.25 + (-uz) * t * f.hx;
    s.z = f.cz - uz * f.hz * 1.25 + (ux) * t * f.hz;
    s.v = U.velocita * (.85 + rnd() * .3);
    s.attivo = true;
  }
  let dist0 = null;
  function aggiornaUccelli(dt, tempo) {
    const f = impronta(); let i = 0;
    const dNow = camera.position.y - camera.userData.ty;
    if (dist0 === null) dist0 = dNow;
    const k = Math.max(.25, Math.min(1, dNow / dist0));      // scendendo restano come all'inizio
    stormi.forEach((s) => {
      if (!s.attivo) { s.attesa -= dt; if (s.attesa <= 0) lancia(s); }
      if (s.attivo) {
        s.x += Math.cos(s.dir) * s.v * k * dt; s.z += Math.sin(s.dir) * s.v * k * dt;
        s.dir += Math.sin(tempo * .3 + s.quota) * .02 * dt;          // virata lentissima
        if (Math.abs(s.x - f.cx) > f.hx * 1.5 || Math.abs(s.z - f.cz) > f.hz * 1.5) { s.attivo = false; s.attesa = .6 + rnd() * 2.5; }
      }
      const ux = Math.cos(s.dir), uz = Math.sin(s.dir), px = -uz, pz = ux;
      s.membri.forEach((m) => {
        if (!s.attivo) { bPos.fill(0, i, i + 18); hPos.fill(0, i, i + 18); i += 18; return; }
        const bx = s.x + (px * m.dx - ux * m.dz) * k, bz = s.z + (pz * m.dx - uz * m.dz) * k;
        const by = quotaA(bx, bz) + s.quota * o.esagera + m.dy;
        const plana = Math.sin(tempo * .45 + m.plana) > .55;        // ogni tanto planano
        const ala = plana ? .08 : Math.sin(tempo * m.freq * 6.28 + m.fase);
        const SP = SPAN * k;
        const tipY = ala * SP * .32, tipB = -SP * .12;           // punta dell'ala: su e giù, un po' indietro
        const half = SP / 2, corda = SP * .16;
        for (const sg of [-1, 1]) {
          const tx = bx + px * half * sg + ux * tipB, tz = bz + pz * half * sg + uz * tipB;
          bPos.set([bx + ux * corda * .6, by, bz + uz * corda * .6, tx, by + tipY, tz, bx - ux * corda * .4, by, bz - uz * corda * .4], i);
          const g = 1.35, c2 = corda * 2.6;
          const hx = bx + px * half * g * sg + ux * tipB, hz = bz + pz * half * g * sg + uz * tipB;
          hPos.set([bx + ux * c2 * .6, by, bz + uz * c2 * .6, hx, by + tipY * g, hz, bx - ux * c2 * .4, by, bz - uz * c2 * .4], i);
          i += 9;
        }
      });
    });
    bGeo.attributes.position.needsUpdate = true; hGeo.attributes.position.needsUpdate = true;
  }

  // ---------- camera
  const cam = (typeof o.camera === 'function' ? o.camera(meta, mobile) : o.camera) || {
    da: { target: [0, 0], distanza: 5200, inclinazione: 12 }, a: { target: [0, 0], distanza: 3000, inclinazione: 18 }
  };
  let prog = 0;
  const t0 = performance.now();
  const lerp = (a, b, t) => a + (b - a) * t, ease = (t) => t * t * (3 - 2 * t);
  function piazzaCamera(now) {
    const p = ease(prog), A = cam.da, B = cam.a;
    const tx = lerp(A.target[0], B.target[0], p), tz = lerp(A.target[1], B.target[1], p);
    const dist = lerp(A.distanza, B.distanza, p);
    const inc = THREE.MathUtils.degToRad(lerp(A.inclinazione, B.inclinazione, p));
    // azimut: direzione (sul terreno) dal punto guardato verso la camera; 0 = da sud
    let daz = (B.azimut || 0) - (A.azimut || 0);
    const az = THREE.MathUtils.degToRad((A.azimut || 0) + daz * p);
    const s = (now - t0) / 1000;
    const rx = Math.sin(s * .11) * dist * .012, rz = Math.cos(s * .08) * dist * .010;
    const ty = quotaA(tx, tz);
    const ox = Math.sin(az), oz = Math.cos(az);
    camera.position.set(tx + rx + ox * Math.sin(inc) * dist, ty + Math.cos(inc) * dist, tz + rz + oz * Math.sin(inc) * dist);
    camera.up.set(-ox, 0, -oz);                       // l'alto dello schermo = direzione di sguardo sul terreno
    camera.lookAt(tx + rx, ty, tz + rz);
    camera.userData = { tx: tx + rx, tz: tz + rz, ty };
    uniforms.uCam.value.copy(camera.position);
    uniforms.uHazeNear.value = dist * .9; uniforms.uHazeFar.value = dist * 2.6;
  }

  function resize() {
    const w = el.clientWidth, h = el.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    renderer.getDrawingBufferSize(uniforms.uRes.value);
    fogU.uAsp.value = w / h;
  }
  resize();
  const ro = new ResizeObserver(resize); ro.observe(el);

  // ---------- ciclo
  let raf = 0, paused = false, last = performance.now(), tempo = 0;
  let frames = 0, fpsT0 = 0, lentoRisolto = false, risolviLento;
  const lento = new Promise((r) => { risolviLento = r; });
  renderer.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); risolviLento('contesto perso'); });
  function draw() {
    renderer.clear();
    renderer.render(scene, camera);
    renderer.render(fogScene, fogCam);
  }
  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(.1, (now - last) / 1000); last = now; tempo += dt;
    uniforms.uT.value = tempo + 400;          // si parte a campo già "avviato"
    fogU.uT.value = tempo;
    piazzaCamera(now);
    aggiornaUccelli(dt, tempo);
    draw();
    if (!lentoRisolto) {
      if (!fpsT0) fpsT0 = now; frames++;
      if (now - fpsT0 > 1500) {
        lentoRisolto = true;
        const fps = frames * 1000 / (now - fpsT0);
        api.fps = Math.round(fps);
        if (fps < 40 && !/[?&]terra=forza/.test(location.search)) risolviLento(fps);
      }
    }
  }
  if (det) {
    const tex = ios ? 'dettaglio-ios.webp' : (mobile ? det.mobile : det.desktop);
    loader.load(q(tex), (t) => {
      t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = orto.anisotropy;
      t.minFilter = THREE.LinearMipmapLinearFilter; t.generateMipmaps = true;
      uniforms.uDet.value = t; gsap_like_fade();
    });
  }
  function gsap_like_fade() { const t0d = performance.now(); (function f() { const k = Math.min(1, (performance.now() - t0d) / 600); uniforms.uDetOn.value = k; if (k < 1) requestAnimationFrame(f); })(); }
  orto.minFilter = THREE.LinearMipmapLinearFilter;
  piazzaCamera(performance.now());
  // all'avvio 2 stormi sono già in scena, gli altri entrano dopo
  stormi.slice(0, 3).forEach((s) => { lancia(s); s.x += Math.cos(s.dir) * impronta().hx * .9; s.z += Math.sin(s.dir) * impronta().hz * .9; });
  raf = requestAnimationFrame(frame);
  draw();

  const api = {
    fps: null, lento, renderer, camera, scene, meta, quotaA,
    progress(p) { prog = Math.min(1, Math.max(0, p)); },
    schermo(x, z) {                                    // posizione a schermo (px CSS) di un punto sul terreno
      const v = new THREE.Vector3(x, quotaA(x, z) + 6, z).project(camera);
      return { x: (v.x + 1) / 2 * el.clientWidth, y: (1 - v.y) / 2 * el.clientHeight, visibile: v.z < 1 && Math.abs(v.x) < 1.05 && Math.abs(v.y) < 1.05 };
    },
    altezza() { return camera.position.y - camera.userData.ty; },
    pausa(v) {
      if (v === paused) return; paused = v;
      if (v) cancelAnimationFrame(raf); else { last = performance.now(); raf = requestAnimationFrame(frame); }
    },
    distruggi() {
      cancelAnimationFrame(raf); ro.disconnect();
      geo.dispose(); mat.dispose(); orto.dispose(); fogMat.dispose(); bGeo.dispose();
      renderer.dispose(); renderer.domElement.remove();
    }
  };
  return api;
}

async function loadImageData(url) {
  const blob = await (await fetch(url)).blob();
  let bmp;
  try { bmp = await createImageBitmap(blob, { colorSpaceConversion: 'none', premultiplyAlpha: 'none' }); }
  catch (e) { bmp = await createImageBitmap(blob); }                 // Safari meno recenti: senza opzioni
  const c = document.createElement('canvas'); c.width = bmp.width; c.height = bmp.height;
  const ctx = c.getContext('2d', { willReadFrequently: true, colorSpace: 'srgb' });
  ctx.drawImage(bmp, 0, 0);
  return ctx.getImageData(0, 0, c.width, c.height);
}
function mulberry(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
