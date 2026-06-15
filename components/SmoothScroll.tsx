"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Single source of truth for scrolling.
 * Lenis owns the scroll position; GSAP's ticker drives Lenis' RAF so that
 * ScrollTrigger and the smooth scroll never drift out of sync.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (prefersReducedMotion()) {
      // Honour the user's wish for stillness — no smoothing, no inertia.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      lerp: 0.085,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      // GSAP ticker uses seconds; Lenis expects milliseconds.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Expose for velocity-reactive components (marquee).
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    // Let layout settle, then sync triggers.
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 350);

    return () => {
      gsap.ticker.remove(raf);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(refreshId);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
