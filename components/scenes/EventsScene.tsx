"use client";

import DepthScene from "../depth/DepthScene";
import Layer from "../depth/Layer";
import { Grain, Vignette, Bloom } from "../depth/Atmosphere";
import { Hills, TreeLine, Festoon, Bokeh } from "./primitives";

const H = 44;

/** Le sere — night terrace: festoon lights, warm horizon glow, vegetation. */
export default function EventsScene() {
  return (
    <DepthScene className="absolute inset-0" intensity={0.8}>
      {/* Night sky with a low warm afterglow */}
      <Layer depth={5} scroll={5} scale={1.16}>
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(to bottom, #20242F 0%, #2C2A38 24%, #4A3A40 40%, #7A5447 50%)",
          }}
        />
      </Layer>
      <Bloom x={52} y={48} color="rgba(225,150,96,0.5)" size={70} />

      {/* Distant village / window lights */}
      <Layer depth={18} scroll={9} blur={1.2}>
        <div className="absolute inset-x-0" style={{ top: `${H - 4}%`, height: "14%" }}>
          <Bokeh color="255,200,140" count={26} seed={3} />
        </div>
      </Layer>

      {/* Hills + tree silhouettes */}
      <Layer depth={26} scroll={12}>
        <Hills color="#1B2026" baseline={H + 2} amp={4} variant={2} />
      </Layer>
      <Layer depth={36} scroll={16}>
        <div className="absolute inset-x-0" style={{ top: `${H - 6}%`, height: "18%" }}>
          <TreeLine color="#11151A" />
        </div>
      </Layer>

      {/* Festoon string lights overhead */}
      <Layer depth={60} scroll={8}>
        <div className="absolute inset-x-0 top-0" style={{ height: "46%" }}>
          <Festoon glow="#FFD79A" />
        </div>
      </Layer>

      {/* Foreground glow / lantern */}
      <Layer depth={86} scroll={6}>
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "26%",
            background:
              "radial-gradient(40% 120% at 30% 100%, rgba(255,190,120,0.4), transparent 70%)," +
              "linear-gradient(to top, rgba(10,8,10,0.7), transparent)",
          }}
        />
      </Layer>

      <Grain opacity={0.06} />
      <Vignette strength={0.55} />
    </DepthScene>
  );
}
