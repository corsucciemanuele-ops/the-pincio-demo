"use client";

import FieldScene from "./FieldScene";

/** Le sere — night terrace: deep indigo with a low warm afterglow. */
export default function EventsScene() {
  return (
    <FieldScene
      slot="sere"
      poster={
        "radial-gradient(70% 40% at 52% 78%, rgba(226,138,92,0.55), transparent 60%)," +
        "linear-gradient(to bottom, #0C1130 0%, #1E2348 34%, #3E2F4A 60%, #6E4444 82%, #2A1A24 100%)"
      }
      light="radial-gradient(46% 30% at 52% 70%, rgba(255,190,120,0.45), transparent 70%)"
      nearHaze="radial-gradient(80% 100% at 30% 120%, rgba(255,170,110,0.3), transparent 70%)"
      bloom={{ x: 52, y: 72, color: "rgba(255,180,120,0.4)", size: 70 }}
      grain={0.06}
      vignette={0.56}
      intensity={0.8}
    />
  );
}
