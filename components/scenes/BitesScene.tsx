"use client";

import DepthScene from "../depth/DepthScene";
import Layer from "../depth/Layer";
import { Grain, Vignette, Bloom } from "../depth/Atmosphere";
import { Foliage, Glassware } from "./primitives";

/** 02 — Bites. A table in dappled noon light, warm materials, soft shadows. */
export default function BitesScene() {
  return (
    <DepthScene className="absolute inset-0" intensity={0.8}>
      {/* Sunlit garden, thrown well out of focus */}
      <Layer depth={6} scroll={5} scale={1.18} blur={6}>
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(160deg, #E9E0C2 0%, #CDD4AE 45%, #9FAE82 100%)",
          }}
        />
      </Layer>
      <Bloom x={68} y={18} color="rgba(255,236,190,0.7)" size={70} />

      {/* Dappled light through leaves */}
      <Layer depth={16} scroll={7} blur={5}>
        <div
          className="h-full w-full mix-blend-screen"
          style={{
            background:
              "radial-gradient(8% 6% at 24% 30%, rgba(255,240,200,0.7), transparent 60%)," +
              "radial-gradient(7% 5% at 40% 22%, rgba(255,240,200,0.6), transparent 60%)," +
              "radial-gradient(10% 7% at 62% 34%, rgba(255,240,200,0.55), transparent 60%)," +
              "radial-gradient(6% 5% at 78% 20%, rgba(255,240,200,0.6), transparent 60%)",
          }}
        />
      </Layer>

      {/* Backlit glassware on the table */}
      <Layer depth={40} scroll={9}>
        <div className="absolute inset-x-0" style={{ bottom: "32%", height: "34%" }}>
          <Glassware color="rgba(60,42,28,0.55)" rim="rgba(255,224,170,0.9)" />
        </div>
      </Layer>

      {/* Table surface — warm linen / travertine plane in soft shadow */}
      <Layer depth={64} scroll={6}>
        <div className="absolute inset-x-0 bottom-0" style={{ height: "36%" }}>
          <div
            className="relative h-full w-full"
            style={{
              background:
                "linear-gradient(to bottom, #C9B48C 0%, #B49A6E 40%, #6E5A3E 100%)",
            }}
          >
            {/* soft object shadows */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(18% 30% at 18% 8%, rgba(40,28,16,0.35), transparent 60%)," +
                  "radial-gradient(16% 26% at 82% 10%, rgba(40,28,16,0.3), transparent 60%)",
              }}
            />
            <div
              className="absolute inset-x-0 top-0 h-3"
              style={{ background: "linear-gradient(to bottom, rgba(255,235,195,0.5), transparent)" }}
            />
          </div>
        </div>
      </Layer>

      {/* Foliage framing */}
      <Layer depth={96} scroll={5} blur={4}>
        <div className="absolute bottom-0 left-0" style={{ width: "24%", height: "60%" }}>
          <Foliage color="#283021" />
        </div>
      </Layer>

      <Grain opacity={0.05} />
      <Vignette strength={0.34} />
    </DepthScene>
  );
}
