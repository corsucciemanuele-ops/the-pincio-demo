"use client";

import DepthScene from "../depth/DepthScene";
import Layer from "../depth/Layer";
import { Grain, Vignette, Bloom } from "../depth/Atmosphere";
import { Hills, Glassware, Bokeh } from "./primitives";

const H = 52;

/** 03 — Bar. Deep sunset, backlit glasses, warm bokeh, evening social glow. */
export default function BarScene() {
  return (
    <DepthScene className="absolute inset-0" intensity={0.85}>
      {/* Dusk sky */}
      <Layer depth={5} scroll={5} scale={1.16}>
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(to bottom, #B6738A 0%, #D08A6E 26%, #E7A86A 44%, #EBB877 54%)",
          }}
        />
      </Layer>

      {/* Big low sun */}
      <Layer depth={10} scroll={4}>
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(30% 26% at 58% 50%, rgba(255,236,196,0.95), rgba(255,200,140,0.5) 45%, transparent 70%)",
          }}
        />
      </Layer>

      {/* Hills in silhouette */}
      <Layer depth={22} scroll={11} blur={1}>
        <Hills color="#6E5560" baseline={H - 3} amp={4} variant={0} />
      </Layer>
      <Layer depth={30} scroll={15}>
        <Hills color="#3E3340" baseline={H} amp={3} variant={2} />
      </Layer>

      {/* Warm bokeh of evening lights */}
      <Layer depth={48} scroll={10} blur={1.4}>
        <div className="absolute inset-x-0" style={{ top: `${H - 6}%`, height: "30%" }}>
          <Bokeh color="255,196,140" count={20} seed={7} />
        </div>
      </Layer>

      {/* Backlit bar counter + glassware */}
      <Layer depth={66} scroll={7}>
        <div className="absolute inset-x-0 bottom-0" style={{ height: "40%" }}>
          <div
            className="relative h-full w-full"
            style={{
              background:
                "linear-gradient(to bottom, rgba(46,30,34,0.2) 0%, #2A1E22 55%, #160F12 100%)",
            }}
          >
            <div className="absolute inset-x-0" style={{ bottom: "55%", height: "70%" }}>
              <Glassware color="rgba(18,12,14,0.9)" rim="rgba(255,206,150,0.95)" />
            </div>
            <div
              className="absolute inset-x-0 top-0 h-4"
              style={{ background: "linear-gradient(to bottom, rgba(255,200,150,0.5), transparent)" }}
            />
          </div>
        </div>
      </Layer>

      <Bloom x={58} y={50} color="rgba(255,190,130,0.4)" size={80} />
      <Grain opacity={0.05} />
      <Vignette strength={0.5} />
    </DepthScene>
  );
}
