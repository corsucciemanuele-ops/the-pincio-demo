"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  /** Pointer drift in px. Bigger = nearer the camera = moves more. */
  depth?: number;
  /** Scroll parallax travel in % of the scene height (signed). */
  scroll?: number;
  /** Depth-of-field blur in px (far layers). */
  blur?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Allow interaction (default layers are decorative / non-interactive). */
  interactive?: boolean;
  /** Uniform scale — use >1 on full-bleed cover layers so parallax never
   *  reveals an edge. */
  scale?: number;
};

/**
 * One depth plane inside a DepthScene.
 * Outer element carries the scroll parallax (GSAP/ScrollTrigger); inner
 * element carries the pointer drift (CSS calc on the scene's --mx/--my).
 */
export default function Layer({
  children,
  depth = 0,
  scroll = 0,
  blur = 0,
  className = "",
  style,
  interactive = false,
  scale = 1,
}: Props) {
  const outer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = outer.current;
    if (!el || scroll === 0 || prefersReducedMotion()) return;
    const scene = el.closest("[data-depth-scene]") as HTMLElement | null;
    if (!scene) return;

    const tween = gsap.fromTo(
      el,
      { yPercent: scroll },
      {
        yPercent: -scroll,
        ease: "none",
        scrollTrigger: {
          trigger: scene,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [scroll]);

  const driftX = `calc(var(--mx, 0) * ${depth}px)`;
  const driftY = `calc(var(--my, 0) * ${(depth * 0.62).toFixed(2)}px)`;

  return (
    <div
      ref={outer}
      className="absolute inset-0"
      style={{ pointerEvents: interactive ? "auto" : "none", willChange: "transform" }}
    >
      <div
        className={`absolute inset-0 ${className}`}
        style={{
          transform: `translate3d(${driftX}, ${driftY}, 0) scale(${scale})`,
          filter: blur ? `blur(${blur}px)` : undefined,
          willChange: "transform",
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
}
