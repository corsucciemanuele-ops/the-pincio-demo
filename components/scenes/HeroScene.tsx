"use client";

import DepthScene from "../depth/DepthScene";
import Layer from "../depth/Layer";
import { Grain, Vignette, Bloom } from "../depth/Atmosphere";
import { Hills, Palm, Loungers } from "./primitives";
import PoolBand from "./PoolBand";

const HORIZON = 48; // % from top — the lake line

/**
 * Mediterranean pool-club hero at sunset — seven parallax planes:
 * 1 cielo · 2 colline · 3 lago · 4 vegetazione · 5 piscina · 6 persone · 7 logo
 * Each plane drifts at its own rate on scroll and pointer.
 */
export default function HeroScene() {
  return (
    <DepthScene className="absolute inset-0" intensity={1.05}>
      {/* 1 — CIELO: warm sunset sky, deeper above, blazing at the horizon */}
      <Layer depth={4} scroll={4} scale={1.18}>
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(to bottom, #2C3360 0%, #7E5A86 16%, #E0758C 32%, #F49A6E 42%, #FFC178 48%)",
          }}
        />
      </Layer>

      {/* sun + bloom sinking to the horizon */}
      <Layer depth={8} scroll={3}>
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(22% 16% at 60% 46%, rgba(255,248,224,1), rgba(255,206,150,0.6) 45%, transparent 70%)",
          }}
        />
      </Layer>

      {/* 2 — COLLINE: receding ridges across the water */}
      <Layer depth={15} scroll={9} blur={2.6}>
        <Hills color="#B9789A" baseline={HORIZON - 5} amp={5} variant={3} />
      </Layer>
      <Layer depth={24} scroll={13} blur={1}>
        <Hills color="#7C5E84" baseline={HORIZON - 1} amp={4} variant={0} />
      </Layer>

      {/* 3 — LAGO: the lake catching the sky, then the infinity pool below */}
      <Layer depth={34} scroll={11}>
        <div className="absolute inset-x-0" style={{ top: `${HORIZON}%`, height: "16%" }}>
          <div
            className="h-full w-full"
            style={{
              background: "linear-gradient(to bottom, #E9879A, #C77E96 60%, #6E6E8E)",
            }}
          />
          <div
            className="absolute inset-0 mix-blend-screen"
            style={{ background: "radial-gradient(40% 120% at 60% 0%, rgba(255,210,150,0.6), transparent 70%)" }}
          />
        </div>
      </Layer>

      {/* 4 — VEGETAZIONE: palms framing the deck */}
      <Layer depth={70} scroll={16} blur={0.4}>
        <div className="absolute bottom-[14%] left-[-2%]" style={{ width: "26%", height: "74%" }}>
          <Palm color="#161E18" />
        </div>
      </Layer>
      <Layer depth={86} scroll={20} blur={0.6}>
        <div className="absolute bottom-[16%] right-[-3%]" style={{ width: "22%", height: "62%" }}>
          <Palm color="#10160F" flip />
        </div>
      </Layer>

      {/* 5 — PISCINA: turquoise infinity pool, WebGL caustics on top */}
      <Layer depth={48} scroll={8}>
        <div className="absolute inset-x-0 bottom-0" style={{ top: `${HORIZON + 16}%` }}>
          <PoolBand
            webgl
            reflection="linear-gradient(to bottom, #8FE0E2 0%, #38B6C6 30%, #1290A2 64%, #0C6E80 100%)"
            tint="#2BB6C4"
          />
        </div>
      </Layer>

      {/* 6 — PERSONE: loungers, parasol, distant figures on the white deck */}
      <Layer depth={62} scroll={12}>
        <div className="absolute inset-x-0" style={{ top: `${HORIZON + 9}%`, height: "20%" }}>
          <Loungers color="rgba(255,250,242,0.92)" shade="rgba(20,30,40,0.25)" />
        </div>
      </Layer>

      {/* white pool deck foreground */}
      <Layer depth={96} scroll={6}>
        <div className="absolute inset-x-0 bottom-0" style={{ height: "9%" }}>
          <div
            className="h-full w-full"
            style={{ background: "linear-gradient(to bottom, #F4EFE6, #E7DCCB)" }}
          />
        </div>
      </Layer>

      {/* atmosphere */}
      <Bloom x={60} y={46} color="rgba(255,180,120,0.4)" size={85} />
      <Grain opacity={0.04} />
      <Vignette strength={0.4} />
    </DepthScene>
  );
}
