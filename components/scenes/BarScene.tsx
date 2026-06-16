"use client";

import FieldScene from "./FieldScene";

/** 03 — Bar. Deep sunset: coral, magenta, dusk. */
export default function BarScene() {
  return (
    <FieldScene
      poster={
        "radial-gradient(50% 34% at 58% 50%, rgba(255,236,196,0.9), transparent 60%)," +
        "linear-gradient(to bottom, #6E4A86 0%, #C16A86 28%, #ED7E6A 50%, #E79A66 64%, #3A2F4A 100%)"
      }
      light="radial-gradient(40% 28% at 58% 50%, rgba(255,214,160,0.6), transparent 70%)"
      nearHaze="linear-gradient(to top, rgba(20,12,26,0.7), transparent)"
      bloom={{ x: 58, y: 50, color: "rgba(255,180,120,0.45)", size: 85 }}
      vignette={0.5}
    />
  );
}
