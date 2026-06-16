"use client";

import FieldScene from "./FieldScene";

export type FrameKind = "luce" | "acqua" | "tavola" | "sere";

const CONF: Record<FrameKind, { slot: string; poster: string; light: string; bloom: { x: number; y: number; color: string; size: number }; vignette: number }> = {
  luce: {
    slot: "gallery-luce",
    poster:
      "radial-gradient(80% 50% at 40% 14%, rgba(255,250,228,0.7), transparent 60%)," +
      "linear-gradient(to bottom,#EFEAD8,#CFE0DA 46%,#7FB6BA 100%)",
    light: "radial-gradient(50% 40% at 40% 24%, rgba(255,250,230,0.6), transparent 70%)",
    bloom: { x: 40, y: 16, color: "rgba(255,248,220,0.5)", size: 60 },
    vignette: 0.3,
  },
  acqua: {
    slot: "gallery-acqua",
    poster:
      "radial-gradient(70% 50% at 60% 16%, rgba(255,236,190,0.5), transparent 60%)," +
      "linear-gradient(to bottom,#7FD0D6,#34B0C0 46%,#0E7280 100%)",
    light: "radial-gradient(46% 50% at 58% 10%, rgba(255,228,180,0.5), transparent 70%)",
    bloom: { x: 58, y: 14, color: "rgba(255,230,180,0.45)", size: 55 },
    vignette: 0.42,
  },
  tavola: {
    slot: "gallery-tavola",
    poster:
      "radial-gradient(70% 50% at 64% 14%, rgba(255,238,196,0.8), transparent 58%)," +
      "linear-gradient(to bottom,#F0E2C0,#D9B27E 50%,#8A5E38 100%)",
    light: "radial-gradient(44% 40% at 66% 18%, rgba(255,234,188,0.6), transparent 70%)",
    bloom: { x: 66, y: 14, color: "rgba(255,224,170,0.5)", size: 60 },
    vignette: 0.4,
  },
  sere: {
    slot: "gallery-sere",
    poster:
      "radial-gradient(70% 40% at 50% 74%, rgba(226,138,92,0.5), transparent 60%)," +
      "linear-gradient(to bottom,#0E1330,#322A4A 44%,#7A4A50 78%,#241622 100%)",
    light: "radial-gradient(50% 30% at 50% 70%, rgba(255,190,120,0.45), transparent 70%)",
    bloom: { x: 50, y: 70, color: "rgba(255,180,120,0.4)", size: 66 },
    vignette: 0.54,
  },
};

/** A vertical, immersive gallery frame — graded field + media slot. */
export default function GalleryFrame({ kind }: { kind: FrameKind }) {
  const c = CONF[kind];
  return (
    <FieldScene
      slot={c.slot}
      poster={c.poster}
      light={c.light}
      bloom={c.bloom}
      vignette={c.vignette}
      intensity={1.2}
    />
  );
}
