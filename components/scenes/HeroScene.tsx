"use client";

import DepthScene from "../depth/DepthScene";
import Layer from "../depth/Layer";
import { Grain, Vignette } from "../depth/Atmosphere";
import MediaSlot from "../MediaSlot";

/**
 * Cinematic golden-hour hero. The real footage leads (full-bleed, parallaxed);
 * only a light film grade + legibility scrims sit on top, so it reads as a
 * graded film still in motion, never muddy. Depth comes from the slow scale
 * parallax on the media plus a subtle foreground scrim plane.
 */
const HERO_POSTER =
  "radial-gradient(120% 80% at 64% 20%, rgba(255,224,168,0.92), transparent 52%)," +
  "radial-gradient(90% 70% at 28% 30%, rgba(236,106,134,0.55), transparent 58%)," +
  "linear-gradient(to bottom, #241F4E 0%, #6E4670 24%, #DC6F88 42%, #F4A06E 56%, #36AEBE 84%, #0E7280 100%)";

export default function HeroScene() {
  return (
    <DepthScene className="absolute inset-0" intensity={0.5}>
      {/* base — real drone/sunset video, slow parallax scale */}
      <Layer depth={6} scroll={8} scale={1.1}>
        <MediaSlot slot="hero" poster={HERO_POSTER} reveal={false} className="h-full w-full" />
      </Layer>

      {/* gentle cinematic grade: warm lift at the horizon, depth at the edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 50% at 60% 40%, rgba(255,196,130,0.16), transparent 60%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(18,14,34,0.32) 0%, transparent 26%, transparent 58%, rgba(6,26,32,0.5) 100%)" }}
      />

      <Grain opacity={0.04} />
      <Vignette strength={0.4} />
    </DepthScene>
  );
}
