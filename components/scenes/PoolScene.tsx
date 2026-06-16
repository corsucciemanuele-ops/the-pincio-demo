"use client";

import DepthScene from "../depth/DepthScene";
import Layer from "../depth/Layer";
import { Grain, Vignette, Bloom } from "../depth/Atmosphere";
import { Hills, Foliage } from "./primitives";
import PoolBand from "./PoolBand";

const H = 46;

/** 01 — Pool. Calm morning water, light stone, airy and slow. */
export default function PoolScene() {
  return (
    <DepthScene className="absolute inset-0" intensity={0.9}>
      <Layer depth={5} scroll={4} scale={1.16}>
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(to bottom, #EDE7D4 0%, #E6E5D0 30%, #DEE6D6 44%)",
          }}
        />
      </Layer>
      <Bloom x={40} y={20} color="rgba(255,238,205,0.55)" size={60} />

      <Layer depth={14} scroll={8} blur={2.4}>
        <Hills color="#C9CFB9" baseline={H - 4} amp={4} variant={1} />
      </Layer>
      <Layer depth={24} scroll={12} blur={0.8}>
        <Hills color="#9CA88E" baseline={H} amp={3} variant={2} />
      </Layer>

      {/* Light stone coping */}
      <Layer depth={40} scroll={10}>
        <div
          className="absolute inset-x-0"
          style={{ top: `${H + 4}%`, height: "5%" }}
        >
          <div
            className="h-full w-full"
            style={{
              background: "linear-gradient(to bottom, #ECE3CD, #DBCFB2)",
            }}
          />
        </div>
      </Layer>

      {/* Calm pool */}
      <Layer depth={52} scroll={8}>
        <div className="absolute inset-x-0 bottom-0" style={{ top: `${H + 9}%` }}>
          <PoolBand
            reflection="linear-gradient(to bottom, #C9D6CC 0%, #A9BEB2 40%, #7E978B 100%)"
            tint="#9DB6AB"
          />
        </div>
      </Layer>

      {/* Foliage at the near edge */}
      <Layer depth={92} scroll={5} blur={3}>
        <div className="absolute bottom-0 right-0" style={{ width: "26%", height: "52%" }}>
          <Foliage color="#3A4A38" flip />
        </div>
      </Layer>

      <Grain opacity={0.04} />
      <Vignette strength={0.22} />
    </DepthScene>
  );
}
