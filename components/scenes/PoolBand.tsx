"use client";

import dynamic from "next/dynamic";
import { PoolSurface } from "./primitives";

const WaterCanvas = dynamic(() => import("../water/WaterCanvas"), { ssr: false });

/**
 * A body of pool water: a reflective gradient, soft displaced ripple bands,
 * and — where requested — the WebGL caustic shimmer in screen blend on top.
 * Used in the hero and the Pool act.
 */
export default function PoolBand({
  webgl = false,
  reflection = "linear-gradient(to bottom, #E9BC8E 0%, #C4B89C 30%, #8FA396 60%, #5E6F62 100%)",
  tint = "#8CA39A",
  className = "",
}: {
  webgl?: boolean;
  reflection?: string;
  tint?: string;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0" style={{ background: reflection }} />
      <PoolSurface className="absolute inset-0 opacity-80" tint={tint} />
      {/* sunset reflection column */}
      <div
        className="absolute inset-y-0 left-1/2 w-1/3 -translate-x-1/2"
        style={{
          background:
            "radial-gradient(60% 90% at 50% 0%, rgba(255,210,150,0.5), transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
      {webgl && (
        <div
          className="absolute inset-0"
          style={{ mixBlendMode: "screen", opacity: 0.85 }}
        >
          <WaterCanvas />
        </div>
      )}
    </div>
  );
}
