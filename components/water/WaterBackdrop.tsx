"use client";

import dynamic from "next/dynamic";

const WaterCanvas = dynamic(() => import("./WaterCanvas"), {
  ssr: false,
});

/**
 * The water as two layers:
 *  1. A CSS gradient base — sky → warm horizon → sage/dusk water. Always
 *     present, so the sunset-water mood never depends on WebGL.
 *  2. The WebGL shimmer on top in `screen` blend — adds caustics and a
 *     sunset reflection where supported, and is a harmless no-op where not.
 */
export default function WaterBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: WATER_GRADIENT }} />
      {/* Warm horizon bloom */}
      <div
        className="absolute inset-x-0"
        style={{
          top: "38%",
          height: "26%",
          background:
            "radial-gradient(120% 100% at 60% 50%, rgba(224,168,110,0.45), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ mixBlendMode: "screen", opacity: 0.9 }}
      >
        <WaterCanvas />
      </div>
    </div>
  );
}

const WATER_GRADIENT =
  "linear-gradient(to bottom," +
  " #F5F0E6 0%," +
  " #F1E9D8 34%," +
  " #ECDCBE 46%," +
  " #D9C8A2 53%," +
  " #B7BBA6 64%," +
  " #8D9C8C 78%," +
  " #62756A 100%)";
