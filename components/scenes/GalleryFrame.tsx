"use client";

import DepthScene from "../depth/DepthScene";
import Layer from "../depth/Layer";
import { Grain, Vignette, Bloom } from "../depth/Atmosphere";
import { Hills, TreeLine, Foliage, Glassware, Festoon, Bokeh, PoolSurface } from "./primitives";

export type FrameKind = "luce" | "acqua" | "tavola" | "sere";

/**
 * A vertical, immersive gallery frame. Each kind is a small environment with
 * internal pointer parallax — coherent with the section it echoes.
 */
export default function GalleryFrame({ kind }: { kind: FrameKind }) {
  if (kind === "luce") {
    return (
      <DepthScene className="absolute inset-0" intensity={1.1}>
        <Layer depth={6} scale={1.16}>
          <div className="h-full w-full" style={{ background: "linear-gradient(to bottom,#EFE8D4,#E4E6D2 40%,#D7E0D4 60%)" }} />
        </Layer>
        <Bloom x={42} y={16} color="rgba(255,238,200,0.6)" size={60} />
        <Layer depth={16} blur={2}><Hills color="#C7CEB6" baseline={42} amp={4} variant={1} /></Layer>
        <Layer depth={28}><Hills color="#9AA688" baseline={50} amp={3} variant={2} /></Layer>
        <Layer depth={48}>
          <div className="absolute inset-x-0 bottom-0" style={{ top: "56%" }}>
            <div className="h-full w-full" style={{ background: "linear-gradient(to bottom,#C6D5CB,#86A092)" }} />
            <PoolSurface className="absolute inset-0 opacity-70" tint="#9DB6AB" />
          </div>
        </Layer>
        <Layer depth={90} blur={3}><div className="absolute bottom-0 left-0" style={{ width: "40%", height: "44%" }}><Foliage color="#37472F" /></div></Layer>
        <Grain opacity={0.05} /><Vignette strength={0.3} />
      </DepthScene>
    );
  }

  if (kind === "acqua") {
    return (
      <DepthScene className="absolute inset-0" intensity={1.2}>
        <Layer depth={6} scale={1.18}>
          <div className="h-full w-full" style={{ background: "linear-gradient(to bottom,#AEC3B8,#7E988C 55%,#4E6157)" }} />
        </Layer>
        <Layer depth={20}><PoolSurface className="absolute inset-0 opacity-90" tint="#7E988C" /></Layer>
        <Bloom x={64} y={22} color="rgba(255,230,180,0.5)" size={55} />
        <Layer depth={50}>
          <div className="absolute inset-x-0 left-1/2 w-1/3 -translate-x-1/2 inset-y-0" style={{ background: "radial-gradient(60% 80% at 50% 0%,rgba(255,220,160,0.5),transparent 70%)", mixBlendMode: "screen" }} />
        </Layer>
        <Grain opacity={0.06} /><Vignette strength={0.42} />
      </DepthScene>
    );
  }

  if (kind === "tavola") {
    return (
      <DepthScene className="absolute inset-0" intensity={0.9}>
        <Layer depth={6} scale={1.18} blur={5}>
          <div className="h-full w-full" style={{ background: "linear-gradient(155deg,#E7DDBE,#C6CFA6 50%,#9BAA7E)" }} />
        </Layer>
        <Bloom x={70} y={14} color="rgba(255,236,190,0.7)" size={66} />
        <Layer depth={36}><div className="absolute inset-x-0" style={{ bottom: "30%", height: "40%" }}><Glassware color="rgba(60,42,28,0.5)" rim="rgba(255,224,170,0.9)" /></div></Layer>
        <Layer depth={62}>
          <div className="absolute inset-x-0 bottom-0" style={{ height: "34%", background: "linear-gradient(to bottom,#C7B289,#6E5A3E)" }} />
        </Layer>
        <Layer depth={94} blur={4}><div className="absolute bottom-0 left-0" style={{ width: "34%", height: "52%" }}><Foliage color="#283021" /></div></Layer>
        <Grain opacity={0.05} /><Vignette strength={0.36} />
      </DepthScene>
    );
  }

  // sere
  return (
    <DepthScene className="absolute inset-0" intensity={0.85}>
      <Layer depth={6} scale={1.16}>
        <div className="h-full w-full" style={{ background: "linear-gradient(to bottom,#20242F,#3A3340 38%,#7A5447 55%)" }} />
      </Layer>
      <Bloom x={50} y={52} color="rgba(225,150,96,0.5)" size={70} />
      <Layer depth={18} blur={1}><div className="absolute inset-x-0" style={{ top: "44%", height: "16%" }}><Bokeh color="255,200,140" count={20} seed={9} /></div></Layer>
      <Layer depth={28}><Hills color="#1B2026" baseline={56} amp={4} variant={2} /></Layer>
      <Layer depth={38}><div className="absolute inset-x-0" style={{ top: "46%", height: "20%" }}><TreeLine color="#11151A" /></div></Layer>
      <Layer depth={60}><div className="absolute inset-x-0 top-0" style={{ height: "52%" }}><Festoon glow="#FFD79A" /></div></Layer>
      <Grain opacity={0.06} /><Vignette strength={0.55} />
    </DepthScene>
  );
}
