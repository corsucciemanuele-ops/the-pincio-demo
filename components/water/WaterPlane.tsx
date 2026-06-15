"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * An ambient water surface graded toward sunset.
 * Not a spectacle — a slow shimmer that lives behind the type.
 * Pure GLSL on a viewport-filling plane; cheap and quiet.
 */

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform float uTime;
  uniform float uScroll;
  uniform vec2  uPointer;
  uniform float uAspect;

  // Palette pulled from the V2 (paper, sage, sunset, dusk)
  const vec3 PAPER  = vec3(0.961, 0.941, 0.902);
  const vec3 SAND   = vec3(0.906, 0.867, 0.788);
  const vec3 SAGE   = vec3(0.369, 0.435, 0.384);
  const vec3 SUNSET = vec3(0.773, 0.541, 0.416);
  const vec3 AMBER  = vec3(0.878, 0.659, 0.431);
  const vec3 DUSK   = vec3(0.494, 0.431, 0.451);

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv;
    p.x *= uAspect;

    // Horizon sits low; sky above, water below.
    float horizon = 0.46 + uScroll * 0.06;

    // ---- Sky: paper drifting into warm sand toward the horizon ----
    float skyT = smoothstep(1.0, horizon, uv.y);
    vec3 sky = mix(PAPER, SAND, skyT * 0.7);
    sky = mix(sky, AMBER, smoothstep(horizon + 0.12, horizon, uv.y) * 0.18);

    // ---- Water: layered ripples reflecting the sunset ----
    float depth = smoothstep(horizon, 0.0, uv.y); // 0 at horizon -> 1 at bottom
    vec2 wp = vec2(p.x * 2.2, (horizon - uv.y) * 6.0);
    wp += uPointer * 0.25;

    float t = uTime * 0.06;
    float ripple = fbm(wp + vec2(t, t * 0.6));
    ripple += 0.5 * fbm(wp * 2.0 - vec2(t * 1.4, 0.0));
    ripple *= mix(0.4, 1.0, depth);

    // Caustic glints — sparse, soft
    float glint = sin((uv.x * 22.0) + ripple * 8.0 + uTime * 0.5);
    glint = smoothstep(0.86, 1.0, glint) * depth * 0.5;

    vec3 water = mix(SAND, SAGE, depth * 0.55);
    water = mix(water, DUSK, depth * 0.35);
    // Sunset reflection column near centre
    float reflCol = smoothstep(0.35, 0.0, abs(uv.x - 0.5 - uPointer.x * 0.1));
    water = mix(water, SUNSET, reflCol * depth * 0.45 * (0.6 + ripple * 0.5));
    water += AMBER * glint;

    vec3 col = mix(water, sky, smoothstep(horizon - 0.015, horizon + 0.015, uv.y));

    // Horizon haze
    float haze = smoothstep(0.05, 0.0, abs(uv.y - horizon));
    col = mix(col, mix(PAPER, AMBER, 0.4), haze * 0.25);

    // Gentle vignette toward the edges keeps it atmospheric
    float vig = smoothstep(1.15, 0.35, distance(uv, vec2(0.5, 0.55)));
    col = mix(col * 0.97, col, vig);

    // Keep the whole thing pale and quiet so type stays legible
    col = mix(PAPER, col, 0.82);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function WaterPlane() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const pointer = useRef(new THREE.Vector2(0, 0));
  const target = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uAspect: { value: 1 },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!mat.current) return;
    uniforms.uTime.value += delta;
    uniforms.uAspect.value = viewport.aspect;

    // Ease pointer toward target
    target.current.set(state.pointer.x, state.pointer.y);
    pointer.current.lerp(target.current, 0.04);
    uniforms.uPointer.value.copy(pointer.current);

    if (typeof window !== "undefined") {
      const s =
        window.scrollY / Math.max(1, window.innerHeight);
      uniforms.uScroll.value = Math.min(1, s);
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}
