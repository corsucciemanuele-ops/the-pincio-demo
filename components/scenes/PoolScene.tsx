"use client";

import FieldScene from "./FieldScene";

/** 01 — Pool. Calm morning: pale azure water and light. */
export default function PoolScene() {
  return (
    <FieldScene
      poster={
        "radial-gradient(90% 60% at 30% 18%, rgba(255,248,225,0.7), transparent 60%)," +
        "linear-gradient(to bottom, #EDEAD9 0%, #CFE0DA 40%, #8FC2C4 72%, #4E9AA4 100%)"
      }
      light="radial-gradient(40% 34% at 38% 26%, rgba(255,250,230,0.6), transparent 70%)"
      nearHaze="radial-gradient(70% 90% at 80% 110%, rgba(120,190,190,0.5), transparent 70%)"
      bloom={{ x: 36, y: 18, color: "rgba(255,245,215,0.5)", size: 60 }}
      vignette={0.24}
    />
  );
}
