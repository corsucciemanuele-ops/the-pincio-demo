"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The WebGL layer contributes *shimmer only* — caustic glints, a sunset
 * reflection column, a horizon light line — on a near-black field.
 * Composited with `mix-blend-mode: screen` over a CSS gradient base, black
 * adds nothing and highlights lighten the water. Quiet, and impossible to
 * break the underlying look.
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

  const vec3 SUNSET = vec3(0.85, 0.55, 0.36);
  const vec3 AMBER  = vec3(0.95, 0.74, 0.46);
  const vec3 LIGHT  = vec3(0.96, 0.90, 0.74);

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i), b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv; p.x *= uAspect;

    float horizon = 0.54 + uScroll * 0.05;
    float depth = smoothstep(horizon, 0.0, uv.y); // 0 at horizon -> 1 at bottom

    vec2 wp = vec2(p.x * 2.2, (horizon - uv.y) * 6.0);
    wp += uPointer * 0.25;
    float t = uTime * 0.06;
    float ripple = fbm(wp + vec2(t, t * 0.6));
    ripple += 0.5 * fbm(wp * 2.0 - vec2(t * 1.4, 0.0));

    // Caustic glints — sparse, soft
    float glint = sin((uv.x * 22.0) + ripple * 8.0 + uTime * 0.5);
    glint = smoothstep(0.84, 1.0, glint) * depth * 0.6;

    // Sunset reflection column near centre, broken up by ripples
    float reflCol = smoothstep(0.42, 0.0, abs(uv.x - 0.5 - uPointer.x * 0.12));
    float refl = reflCol * depth * (0.18 + 0.5 * ripple);

    // Horizon light line
    float hz = smoothstep(0.05, 0.0, abs(uv.y - horizon));

    vec3 shimmer = vec3(0.0);
    shimmer += AMBER  * glint;
    shimmer += SUNSET * refl * 0.6;
    shimmer += LIGHT  * hz * 0.35;

    gl_FragColor = vec4(shimmer, 1.0);
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
    target.current.set(state.pointer.x, state.pointer.y);
    pointer.current.lerp(target.current, 0.04);
    uniforms.uPointer.value.copy(pointer.current);
    if (typeof window !== "undefined") {
      const s = window.scrollY / Math.max(1, window.innerHeight);
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
