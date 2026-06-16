"use client";

import DepthScene from "../depth/DepthScene";
import Layer from "../depth/Layer";
import { Grain, Vignette, Bloom } from "../depth/Atmosphere";
import { Hills, TreeLine, Village, Lake, Foliage } from "./primitives";

/** Dove siamo — the Montefeltro colle above the Lago di Mercatale. */
export default function LocationScene() {
  return (
    <DepthScene className="absolute inset-0" intensity={0.9}>
      {/* Hazy warm sky */}
      <Layer depth={5} scroll={5} scale={1.16}>
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(to bottom, #E7DAB8 0%, #ECD4A6 34%, #EDC79A 48%)",
          }}
        />
      </Layer>
      <Bloom x={30} y={20} color="rgba(255,236,190,0.6)" size={64} />

      {/* Receding ranges */}
      <Layer depth={12} scroll={7} blur={3}>
        <Hills color="#CDBE9A" baseline={40} amp={5} variant={3} />
      </Layer>
      <Layer depth={20} scroll={10} blur={1.4}>
        <Hills color="#A6AE8A" baseline={46} amp={4} variant={0} />
      </Layer>

      {/* Hilltop village on the far colle */}
      <Layer depth={28} scroll={12}>
        <div className="absolute" style={{ left: "58%", top: "30%", width: "20%", height: "16%" }}>
          <Village color="#6A6157" />
        </div>
      </Layer>

      {/* The lake */}
      <Layer depth={40} scroll={9}>
        <div className="absolute inset-x-0" style={{ top: "52%", height: "20%" }}>
          <Lake top="#CBD6CE" bottom="#7E948A" />
        </div>
      </Layer>

      {/* Near colle with cypress — our hill */}
      <Layer depth={56} scroll={14}>
        <Hills color="#5E6B4F" baseline={70} amp={3} variant={1} />
      </Layer>
      <Layer depth={64} scroll={18}>
        <div className="absolute inset-x-0" style={{ top: "60%", height: "22%" }}>
          <TreeLine color="#3A472F" />
        </div>
      </Layer>

      {/* Foreground foliage */}
      <Layer depth={96} scroll={6} blur={4}>
        <div className="absolute bottom-0 right-0" style={{ width: "26%", height: "56%" }}>
          <Foliage color="#26301F" flip />
        </div>
      </Layer>

      <Grain opacity={0.045} />
      <Vignette strength={0.34} />
    </DepthScene>
  );
}
