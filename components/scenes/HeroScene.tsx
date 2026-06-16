"use client";

import DepthScene from "../depth/DepthScene";
import Layer from "../depth/Layer";
import { Grain, Vignette } from "../depth/Atmosphere";
import { Hills, TreeLine, Foliage } from "./primitives";
import PoolBand from "./PoolBand";

const HORIZON = 50; // % from top

/**
 * Golden-hour pool terrace over the Montefeltro valley.
 * Bright sky at the horizon, foreground in shadow — so depth reads and the
 * cream type stays legible. Sky → sun → three receding ridges → cypress line
 * → pool (WebGL caustics) → travertine deck → near foliage.
 */
export default function HeroScene() {
  return (
    <DepthScene className="absolute inset-0" intensity={1}>
      {/* Sky — deeper warm above, bright glow toward the horizon */}
      <Layer depth={5} scroll={5} scale={1.16}>
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(to bottom, #D9B071 0%, #E6C083 22%, #F2D49C 38%, #F8DFA9 48%)",
          }}
        />
      </Layer>

      {/* Low sun + bloom near the horizon */}
      <Layer depth={9} scroll={4}>
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(26% 22% at 62% 47%, rgba(255,243,214,0.95), rgba(255,221,160,0.45) 40%, transparent 68%)",
          }}
        />
      </Layer>

      {/* Far ridge — hazy and pale (atmospheric perspective) */}
      <Layer depth={16} scroll={9} blur={3}>
        <Hills color="#C9AE80" baseline={HORIZON - 6} amp={5} variant={3} />
      </Layer>
      {/* Mid ridge — muted olive */}
      <Layer depth={26} scroll={13} blur={1.1}>
        <Hills color="#8C8A63" baseline={HORIZON - 1} amp={4} variant={0} />
      </Layer>
      {/* Near ridge — deep, in shadow */}
      <Layer depth={34} scroll={17}>
        <Hills color="#4D553C" baseline={HORIZON + 2} amp={3} variant={2} />
      </Layer>

      {/* Cypress line just above the water */}
      <Layer depth={42} scroll={20} blur={0.8}>
        <div
          className="absolute inset-x-0"
          style={{ top: `${HORIZON - 8}%`, height: "16%" }}
        >
          <TreeLine color="#2C3526" />
        </div>
      </Layer>

      {/* Pool water — fills below the horizon, WebGL caustics on top */}
      <Layer depth={56} scroll={12}>
        <div
          className="absolute inset-x-0 bottom-0"
          style={{ top: `${HORIZON}%` }}
        >
          <PoolBand
            webgl
            reflection="linear-gradient(to bottom, #E7BA86 0%, #B59C78 20%, #6E7E6F 50%, #34423C 100%)"
            tint="#5E7166"
          />
        </div>
      </Layer>

      {/* Travertine deck — foreground ground plane, in warm shadow */}
      <Layer depth={78} scroll={8}>
        <div className="absolute inset-x-0 bottom-0" style={{ height: "16%" }}>
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(to bottom, #5A4A36 0%, #3C3122 55%, #271F15 100%)",
              boxShadow: "inset 0 8px 16px -6px rgba(255,220,170,0.25)",
            }}
          />
        </div>
      </Layer>

      {/* Near foliage framing the lower-left, thrown out of focus */}
      <Layer depth={104} scroll={6} blur={5}>
        <div
          className="absolute bottom-0 left-0"
          style={{ width: "32%", height: "66%" }}
        >
          <Foliage color="#1A231B" />
        </div>
      </Layer>

      {/* Atmosphere */}
      <Grain opacity={0.045} />
      <Vignette strength={0.42} />
    </DepthScene>
  );
}
