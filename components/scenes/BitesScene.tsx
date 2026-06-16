"use client";

import FieldScene from "./FieldScene";

/** 02 — Bites. Warm noon: honeyed light, terracotta, linen. */
export default function BitesScene() {
  return (
    <FieldScene
      slot="tempi-bites"
      poster={
        "radial-gradient(80% 60% at 70% 16%, rgba(255,238,196,0.85), transparent 58%)," +
        "linear-gradient(to bottom, #F0E4C4 0%, #E6C896 42%, #CBA06A 74%, #9A6E44 100%)"
      }
      light="radial-gradient(38% 30% at 66% 22%, rgba(255,236,190,0.7), transparent 70%)"
      nearHaze="radial-gradient(70% 90% at 18% 110%, rgba(150,110,70,0.5), transparent 70%)"
      bloom={{ x: 68, y: 16, color: "rgba(255,224,170,0.55)", size: 66 }}
      vignette={0.34}
    />
  );
}
