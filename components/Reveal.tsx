"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from "@/lib/gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds for child elements with [data-reveal-child]. */
  delay?: number;
  y?: number;
  as?: keyof JSX.IntrinsicElements;
};

/**
 * Fades + lifts its children into place on scroll.
 * If the element contains nodes marked [data-reveal-child] those are staggered;
 * otherwise the element itself animates.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }

    const children = el.querySelectorAll<HTMLElement>("[data-reveal-child]");
    const targets = children.length ? Array.from(children) : [el];

    gsap.set(targets, { y, autoAlpha: 0 });

    const tween = gsap.to(targets, {
      y: 0,
      autoAlpha: 1,
      duration: 1.1,
      delay,
      ease: EASE.soft,
      stagger: 0.09,
      scrollTrigger: {
        trigger: el,
        start: "top 82%",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className} style={{ visibility: "hidden" }}>
      {children}
    </Tag>
  );
}
