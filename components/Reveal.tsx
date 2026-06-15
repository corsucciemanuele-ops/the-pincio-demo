"use client";

import { useEffect, useRef } from "react";
import { gsap, EASE, prefersReducedMotion } from "@/lib/gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds before the run starts. */
  delay?: number;
  y?: number;
  as?: keyof JSX.IntrinsicElements;
};

/**
 * Fades + lifts its children into place on scroll.
 * If the element contains nodes marked [data-reveal-child] those are staggered
 * (and the wrapper itself is made visible); otherwise the wrapper animates.
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

    const childEls = Array.from(
      el.querySelectorAll<HTMLElement>("[data-reveal-child]")
    );
    const hasChildren = childEls.length > 0;

    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1 });
      if (hasChildren) gsap.set(childEls, { autoAlpha: 1, y: 0 });
      return;
    }

    let tween: gsap.core.Tween;

    if (hasChildren) {
      // Wrapper visible; children carry the animation.
      gsap.set(el, { autoAlpha: 1 });
      gsap.set(childEls, { y, autoAlpha: 0 });
      tween = gsap.to(childEls, {
        y: 0,
        autoAlpha: 1,
        duration: 1.1,
        delay,
        ease: EASE.soft,
        stagger: 0.09,
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    } else {
      gsap.set(el, { y, autoAlpha: 0 });
      tween = gsap.to(el, {
        y: 0,
        autoAlpha: 1,
        duration: 1.1,
        delay,
        ease: EASE.soft,
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    }

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
