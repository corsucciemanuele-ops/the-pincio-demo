/* =========================================================
   INTRO "IL COLLE" — componente condiviso (Nido del Corvo, The Pincio).
   È uno strato sopra la prima pagina vera del sito, che resta sotto e si legge.

   montaIlColle({ sito: 'nido' | 'pincio', links: { nido, pincio }, onFine, lenis })
   - prima visita: completa; poi si entra direttamente;
   - ?from=ilcolle (arrivo dall'altro locale) salta l'intro; ?ilcolle=1 la riapre;
   - scorrendo: le scritte svaniscono, la camera si inclina e SI FERMA sulla vista con i
     due locali; lo scroll non porta dentro il sito: si entra solo toccando un locale;
   - un tocco sul pallino o sul nome: scivolo; sul proprio locale l'intro si chiude sulla
     prima schermata (senza ricaricare), sull'altro si apre il suo sito con ?from=ilcolle.
   Dipendenze: window.gsap + window.ScrollTrigger; scena 3D in ./terra3d.js; media in ../media/.
   Per aggiungerlo al Pincio: copiare js/ilcolle.js, js/terra3d.js e media/terra/ e chiamare
   montaIlColle({ sito: 'pincio', ... }).
   ========================================================= */
const V = '20261010-2';
const MEDIA = new URL('../media/', import.meta.url).href;

// posizioni nell'intro (metri, x est, z sud): Nido reale; il Pincio in fondo alla strada,
// dietro il Nido verso sud-ovest, a ~200 m (solo qui, per leggerli come due locali distinti)
const LOCALI = {
  nido:   { nome: 'Nido del Corvo', off: [0, 0] },
  pincio: { nome: 'The Pincio',     off: [-141, 141] }
};
// titolo: Futura (su iPhone/Mac di sistema) o Jost, il carattere di "RISTORANTE SUL COLLE" del logo
const TITOLO = { font: "400 clamp(1.9rem, 8.6vw, 4.6rem)/1 Futura, Jost, 'Century Gothic', sans-serif", sp: '.2em', fonts: 'family=Jost:wght@400' };

export function deveMostrare() {
  const q = location.search;
  if (/[?&]ilcolle=1\b/.test(q)) return true;
  if (/[?&]from=ilcolle\b/.test(q)) return false;
  try { return !localStorage.getItem('ilcolle-visto'); } catch (e) { return true; }
}

export async function montaIlColle({ sito, links, onFine, lenis }) {
  const gsap = window.gsap, ST = window.ScrollTrigger;
  try { localStorage.setItem('ilcolle-visto', '1'); } catch (e) {}
  const mobile = matchMedia('(max-width: 767px)').matches;
  stile(TITOLO);
  const root = document.documentElement;
  root.classList.add('ilc-attiva');                       // la pagina sotto non scorre oltre l'intro

  // ---------- DOM
  const el = document.createElement('div');
  el.className = 'ilc'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Il Colle — introduzione');
  el.innerHTML = `
    <div class="ilc__scena"><div class="ilc__3d"></div>
      <picture><source media="(max-width: 767px)" srcset="${MEDIA}terra/riserva-mobile.webp?v=${V}">
      <img class="ilc__riserva" src="${MEDIA}terra/riserva-desktop.webp?v=${V}" alt="" decoding="async" loading="lazy"></picture></div>
    <div class="ilc__luce"></div>
    <div class="ilc__testi">
      <p class="ilc__titolo" aria-label="Il Colle"><span>IL COLLE</span></p>
      <p class="ilc__sotto">Nel cuore del Montefeltro</p>
    </div>
    <span class="ilc__ang ilc__ang--tl">MARCHE · ITALIA</span>
    <span class="ilc__ang ilc__ang--tr">43°46′ N · 12°29′ E</span>
    <span class="ilc__ang ilc__ang--bl">SASSOCORVARO AUDITORE</span>
    <span class="ilc__ang ilc__ang--br">SCORRI <svg viewBox="0 0 10 22" aria-hidden="true"><path d="M5 1v19M1 16l4 4 4-4"/></svg></span>
    <div class="ilc__scivolo" aria-hidden="true"></div>`;
  document.body.appendChild(el);
  const spazio = document.createElement('div');
  spazio.className = 'ilc-spazio'; spazio.setAttribute('aria-hidden', 'true');
  const main = document.querySelector('main') || document.body;
  main.insertBefore(spazio, main.firstChild);
  window.scrollTo(0, 0);
  ST && ST.refresh();

  // ---------- pallini: cerchio + linea sottile verso un lato + nome grande; un tocco = entra
  const pins = Object.entries(LOCALI).map(([id, l]) => {
    const b = document.createElement('button');
    b.className = 'ilc__pin'; b.type = 'button'; b.setAttribute('aria-label', 'Entra: ' + l.nome);
    b.innerHTML = `<span class="ilc__punto"></span><span class="ilc__linea"></span><span class="ilc__nome">${l.nome}</span>`;
    el.appendChild(b);
    b.addEventListener('click', () => entra(id, l.nome));
    return { id, l, b, x: 0, z: 0 };
  });

  // ---------- scena 3D (riserva: foto)
  let terra = null, finito = false;
  const riserva = el.querySelector('.ilc__riserva');
  const usaRiserva = () => { riserva.loading = 'eager'; el.classList.add('is-riserva'); el.classList.remove('is-3d'); if (terra) { terra.distruggi(); terra = null; } };
  if (/[?&]terra=riserva/.test(location.search)) usaRiserva();
  else import(`./terra3d.js?v=${V}`).then((m) => m.createTerra(el.querySelector('.ilc__3d'), {
    base: `${MEDIA}terra/`, v: V,
    camera: (meta, mob) => {
      const nido = [meta.nido_m[0], -meta.nido_m[1]], punta = [-367, 133], lago = [-330, 110];
      const mezzo = [(nido[0] + lago[0]) / 2, (nido[1] + lago[1]) / 2];
      const D = mob ? 5400 : 4000;
      const az = Math.atan2(nido[0] - punta[0], nido[1] - punta[1]) * 180 / Math.PI;
      pins.forEach((p) => { p.x = nido[0] + LOCALI[p.id].off[0]; p.z = nido[1] + LOCALI[p.id].off[1]; });
      return { da: { target: mezzo, distanza: D, inclinazione: 10, azimut: 0 },
               a: { target: nido, distanza: D * (mob ? .72 : .78), inclinazione: mob ? 46 : 50, azimut: az } };
    }
  })).then((t) => {
    if (finito) { t.distruggi(); return; }
    terra = t; el.classList.add('is-3d');
    t.lento.then(usaRiserva);
  }).catch(usaRiserva);

  // ---------- entrata delle scritte
  gsap.from('.ilc__titolo span', { opacity: 0, duration: 1.6, ease: 'power2.out', delay: .2 });
  gsap.from(['.ilc__sotto', '.ilc__ang'], { opacity: 0, y: 6, duration: 1.1, stagger: .08, ease: 'power2.out', delay: .7 });

  // ---------- scroll: scritte via, camera che si inclina e si ferma; poi i pallini
  const disc = { p: 0 };
  let pinsOn = false;
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: spazio, start: 0, end: () => Math.max(200, spazio.offsetHeight - innerHeight),   // fisso: indipendente da altri refresh
      scrub: mobile ? .35 : true, invalidateOnRefresh: true,
      onUpdate: (self) => { pinsOn = self.progress > .82; }
    }
  })
    .to(['.ilc__testi', '.ilc__ang', '.ilc__luce'], { opacity: 0, duration: .2 }, .02)
    .to(disc, { p: 1, duration: .9, ease: 'power1.inOut', onUpdate: () => terra && terra.progress(disc.p) }, 0)
    .to(riserva, { scale: 1.3, duration: .9, ease: 'power1.inOut' }, 0)
    .to({}, { duration: .1 });

  requestAnimationFrame(() => ST && ST.refresh());
  setTimeout(() => ST && ST.refresh(), 1200);
  (function segui() {
    if (finito) return;
    const pos = pins.map((p) => terra ? terra.schermo(p.x, p.z) : null);
    // la linea va verso l'esterno: il pallino più a sinistra a sinistra, l'altro a destra
    const sx = pos[0] && pos[1] ? (pos[0].x <= pos[1].x ? 0 : 1) : 0;
    pins.forEach((p, k) => {
      const s = pos[k];
      if (!s) { p.b.classList.remove('is-on'); return; }
      p.b.style.transform = `translate(${s.x}px, ${s.y}px)`;
      p.b.classList.toggle('a-sinistra', k === sx);
      // la linea si accorcia se il nome non ci sta: il nome resta sempre dentro lo schermo
      const nome = p.b.querySelector('.ilc__nome'), wN = nome.offsetWidth;
      const spazio = (k === sx ? s.x : innerWidth - s.x) - 7 - 12;
      p.b.style.setProperty('--l', Math.max(14, Math.min(mobile ? 56 : 80, spazio - wN)) + 'px');
      p.b.classList.toggle('is-on', pinsOn && s.visibile);
    });
    requestAnimationFrame(segui);
  })();

  // ---------- ingresso nei locali (scivolo)
  function entra(id, nome) {
    if (finito) return;
    const sc = el.querySelector('.ilc__scivolo');
    sc.textContent = nome; sc.className = 'ilc__scivolo is-' + id;
    requestAnimationFrame(() => sc.classList.add('is-on'));
    if (id === sito) {
      // proprio locale: sotto lo scivolo l'intro si chiude, poi lo scivolo esce e resta la prima schermata
      setTimeout(() => {
        chiudi();
        gsap.to(el, { xPercent: -100, duration: .7, ease: 'power3.inOut', delay: .15, onComplete: () => { terra && terra.distruggi(); el.remove(); } });
      }, 700);
    } else {
      const u = links[id];
      setTimeout(() => { location.href = u + (u.includes('?') ? '&' : '?') + 'from=ilcolle&utm_source=ilcolle&utm_medium=intro'; }, 680);
    }
  }
  function chiudi() {
    finito = true;
    tl.scrollTrigger && tl.scrollTrigger.kill(); tl.kill();
    spazio.remove(); root.classList.remove('ilc-attiva');
    window.scrollTo(0, 0); lenis && lenis.scrollTo(0, { immediate: true, force: true });
    ST && ST.refresh();
    onFine && onFine();
    if (/[?&]ilcolle=1\b/.test(location.search)) history.replaceState(null, '', location.pathname);
  }
  window.addEventListener('pageshow', (e) => { if (e.persisted) el.querySelector('.ilc__scivolo').classList.remove('is-on'); });
  return { entra };
}

function stile(T) {
  if (document.getElementById('ilc-stile')) return;
  if (T.fonts) { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = `https://fonts.googleapis.com/css2?${T.fonts}&display=swap`; document.head.appendChild(l); }
  const s = document.createElement('style'); s.id = 'ilc-stile';
  s.textContent = `
.ilc-attiva main > :not(.ilc-spazio), .ilc-attiva body > footer, .ilc-attiva .finale{ display:none !important; }
.ilc{ position:fixed; inset:0; z-index:220; overflow:hidden; pointer-events:none;
  background:#4a5340; color:#FBF7EF; font-family:Inter,system-ui,sans-serif; }
.ilc__scena{ position:absolute; inset:0; }
.ilc__3d{ position:absolute; inset:0; opacity:0; transition:opacity .9s ease; }
.ilc.is-3d .ilc__3d{ opacity:1; }
.ilc__riserva{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0; transition:opacity .6s ease; }
.ilc.is-riserva .ilc__riserva{ opacity:1; }
.ilc__luce{ position:absolute; left:50%; top:50%; width:min(140vw,1000px); height:min(80vw,560px); transform:translate(-50%,-50%);
  background:radial-gradient(closest-side, rgba(255,250,238,.24), rgba(255,250,238,.08) 50%, rgba(255,250,238,0)); }
.ilc__testi{ position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:0 16px; }
.ilc__titolo{ margin:0; font:${T.font}; letter-spacing:${T.sp}; margin-right:-${T.sp}; color:#FFFCF4;
  text-shadow:0 0 22px rgba(18,20,14,.42), 0 1px 3px rgba(18,20,14,.38); -webkit-font-smoothing:antialiased; text-rendering:geometricPrecision; }
.ilc__sotto{ margin:1.1rem 0 0; font:500 .74rem/1.4 Inter, sans-serif; letter-spacing:.26em; text-transform:uppercase; color:#FFFCF4;
  text-shadow:0 0 14px rgba(18,20,14,.5), 0 1px 2px rgba(18,20,14,.45); }
.ilc__ang{ position:absolute; font:500 .6rem/1 Inter, sans-serif; letter-spacing:.26em; text-transform:uppercase; color:#FFFCF4;
  text-shadow:0 0 12px rgba(18,20,14,.55), 0 1px 2px rgba(18,20,14,.5); display:flex; align-items:center; gap:.7em; }
.ilc__ang--tl{ left:20px; top:calc(env(safe-area-inset-top) + 20px); }
.ilc__ang--tr{ right:20px; top:calc(env(safe-area-inset-top) + 20px); letter-spacing:.16em; }
.ilc__ang--bl{ left:20px; bottom:calc(env(safe-area-inset-bottom) + 22px); }
.ilc__ang--br{ right:20px; bottom:calc(env(safe-area-inset-bottom) + 22px); }
.ilc__ang svg{ width:8px; height:18px; fill:none; stroke:currentColor; stroke-width:1; animation:ilc-giu 2.4s ease-in-out infinite; }
@keyframes ilc-giu{ 0%,100%{ transform:translateY(0); opacity:.7 } 50%{ transform:translateY(4px); opacity:1 } }
@media (min-width: 768px){ .ilc__ang{ font-size:.64rem; } .ilc__ang--tl,.ilc__ang--bl{ left:32px; } .ilc__ang--tr,.ilc__ang--br{ right:32px; } }
/* pallino: il bottone parte dal punto e si allunga verso il nome (area di tocco ampia e separata) */
.ilc__pin{ position:absolute; left:0; top:0; height:48px; margin-top:-24px; padding:0; border:0; background:none; cursor:pointer;
  display:flex; align-items:center; gap:0; color:#FBF7EF; opacity:0; pointer-events:none;
  transition:opacity .7s cubic-bezier(.22,1,.36,1); -webkit-tap-highlight-color:transparent; }
.ilc__pin.is-on{ opacity:1; pointer-events:auto; }
.ilc__pin.a-sinistra{ flex-direction:row-reverse; transform-origin:right center; }
.ilc__pin:not(.a-sinistra){ margin-left:-7px; }
.ilc__pin.a-sinistra{ translate:calc(-100% + 7px) 0; }
.ilc__punto{ flex:0 0 14px; height:14px; border-radius:50%; border:1.5px solid #FBF7EF; background:rgba(251,247,239,.3);
  box-shadow:0 0 0 1px rgba(30,30,25,.18), 0 1px 6px rgba(30,30,25,.3); transition:transform .3s, background-color .3s; }
.ilc__linea{ flex:0 0 var(--l, 48px); height:1px; background:linear-gradient(90deg, rgba(251,247,239,.95), rgba(251,247,239,.55)); box-shadow:0 1px 3px rgba(30,30,25,.35); }
.ilc__pin.a-sinistra .ilc__linea{ background:linear-gradient(270deg, rgba(251,247,239,.95), rgba(251,247,239,.55)); }
.ilc__nome{ padding:0 8px; white-space:nowrap; font:400 clamp(1.3rem, 5.6vw, 1.9rem)/1 Italiana, serif; letter-spacing:.03em;
  text-shadow:0 1px 10px rgba(20,20,15,.6); }
@media (hover: hover){ .ilc__pin:hover .ilc__punto{ transform:scale(1.25); background:rgba(251,247,239,.6); } }
.ilc__pin:active .ilc__punto{ transform:scale(1.25); background:rgba(251,247,239,.6); }
.ilc__pin:focus-visible .ilc__nome{ outline:1px solid #FBF7EF; outline-offset:4px; }
.ilc__scivolo{ position:absolute; inset:0; z-index:5; display:grid; place-items:center; transform:translateX(100%);
  transition:transform .7s cubic-bezier(.65,0,.35,1); background:#F7F2E9; color:#3B4339; font:400 1.8rem/1 Italiana, serif; pointer-events:none; }
.ilc__scivolo.is-pincio{ background:#E8F0EC; color:#1F4A4A; }
.ilc__scivolo.is-on{ transform:translateX(0); }
.ilc-spazio{ height:240vh; height:240svh; }`;
  document.head.appendChild(s);
}
