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
    if (prefersReducedMotion()) {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
      return;
    }

    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      raf = 0,
      inView = true;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      // Normalise around the element centre, clamp to -1..1.
      tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
      ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
    };

    const tick = () => {
      cx += (tx * intensity - cx) * 0.06;
      cy += (ty * intensity - cy) * 0.06;
      el.style.setProperty("--mx", cx.toFixed(4));
      el.style.setProperty("--my", cy.toFixed(4));
      raf = requestAnimationFrame(tick);
    };

    // Only run the loop while the scene is on screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !raf) raf = requestAnimationFrame(tick);
        if (!inView && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 }
    );
    io.observe(el);

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
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
