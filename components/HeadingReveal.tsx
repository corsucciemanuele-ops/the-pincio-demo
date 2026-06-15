"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from "@/lib/gsap";

type HeadingRevealProps = {
  lines: React.ReactNode[];
  className?: string;
  start?: string;
  delay?: number;
};

/**
 * Masked, line-by-line reveal for the serif display headlines.
 * Each line sits inside an overflow-hidden wrapper and slides up from below.
 */
export default function HeadingReveal({
  lines,
  className = "",
  start = "top 85%",
  delay = 0,
}: HeadingRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const spans = el.querySelectorAll<HTMLElement>(".reveal-line > span");

    if (prefersReducedMotion()) {
      gsap.set(spans, { yPercent: 0 });
      gsap.set(el, { autoAlpha: 1 });
      return;
    }

    gsap.set(el, { autoAlpha: 1 });
    gsap.set(spans, { yPercent: 115 });

    const tween = gsap.to(spans, {
      yPercent: 0,
      duration: 1.25,
      delay,
      ease: EASE.settle,
      stagger: 0.12,
      scrollTrigger: { trigger: el, start },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [start, delay]);

  return (
    <div ref={ref} className={className} style={{ visibility: "hidden" }}>
      {lines.map((line, i) => (
        <span className="reveal-line" key={i}>
          <span>{line}</span>
        </span>
      ))}
    </div>
  );
}
