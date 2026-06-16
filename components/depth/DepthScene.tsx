"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Overall strength of the mouse-driven camera move. */
  intensity?: number;
  perspective?: number;
};

/**
 * A spatial container. Tracks the pointer and writes eased --mx / --my
 * (range roughly -1..1) onto itself; Layer children read those vars through
 * CSS calc to drift at depth-dependent rates. The result reads as a small
 * camera move through a real space rather than a flat panel.
 */
export default function DepthScene({
  children,
  className = "",
  intensity = 1,
  perspective = 1400,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // v2: no mouse-driven parallax (desktop-only, doesn't exist on touch).
    // Depth now comes purely from scroll (Layer) — works everywhere.
    el.style.setProperty("--mx", "0");
    el.style.setProperty("--my", "0");
  }, [intensity]);

  return (
    <div
      ref={ref}
      data-depth-scene
      // Position is supplied by `className` (e.g. "absolute inset-0" or
      // "relative h-full") so it establishes the containing block for Layers.
      className={`overflow-hidden ${className}`}
      style={{ perspective: `${perspective}px`, ["--mx" as string]: 0, ["--my" as string]: 0 }}
    >
      {children}
    </div>
  );
}
