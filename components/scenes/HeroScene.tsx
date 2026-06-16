"use client";

import DepthScene from "../depth/DepthScene";
import Layer from "../depth/Layer";
import { Grain, Vignette, Bloom } from "../depth/Atmosphere";
import MediaSlot from "../MediaSlot";

/**
 * Cinematic golden-hour hero. A full-bleed graded field (the slot for the real
 * drone video) with translucent atmosphere planes drifting in front at
 * different depths — so depth is felt even over flat media. No illustration.
 */
const HERO_POSTER =
  "radial-gradient(120% 80% at 64% 20%, rgba(255,224,168,0.92), transparent 52%)," +
  "radial-gradient(90% 70% at 28% 30%, rgba(236,106,134,0.55), transparent 58%)," +
  "linear-gradient(to bottom, #241F4E 0%, #6E4670 24%, #DC6F88 42%, #F4A06E 56%, #36AEBE 84%, #0E7280 100%)";

export default function HeroScene() {
  return (
    <DepthScene className="absolute inset-0" intensity={1}>
      {/* base — the real video drops in here later (full-bleed) */}
      <Layer depth={5} scroll={7} scale={1.12}>
        <MediaSlot slot="hero" poster={HERO_POSTER} reveal={false} className="h-full w-full" />
      </Layer>

      {/* drifting warm light field */}
      <Layer depth={16} scroll={10} blur={24}>
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(40% 30% at 62% 40%, rgba(255,236,196,0.7), transparent 70%)",
          }}
        />
      </Layer>

      {/* soft horizon haze that separates the planes */}
      <Layer depth={28} scroll={14}>
        <div
          className="absolute inset-x-0"
          style={{
            top: "44%",
            height: "20%",
            background: "linear-gradient(to bottom, transparent, rgba(255,210,160,0.5) 50%, transparent)",
            filter: "blur(14px)",
          }}
        />
      </Layer>

      {/* near light-leak haze, heavily blurred (depth-of-field foreground) */}
      <Layer depth={64} scroll={8} blur={40}>
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "42%",
            background:
              "radial-gradient(70% 90% at 20% 110%, rgba(43,182,196,0.55), transparent 70%)",
          }}
        />
      </Layer>

      {/* atmosphere */}
      <Bloom x={64} y={26} color="rgba(255,196,140,0.45)" size={80} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(20,16,40,0.28) 0%, transparent 30%, transparent 62%, rgba(8,30,36,0.4) 100%)" }}
      />
      <Grain opacity={0.05} />
      <Vignette strength={0.46} />
    </DepthScene>
  );
}
