"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * A hairline progress indicator at the top — a sundial for the page.
 * Its colour drifts morning → sunset as you descend, echoing the narrative.
 */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${p})`;
      // Hue drift: sage (morning) -> amber/sunset (evening)
      const c = gsap.utils.interpolate(
        ["#5E6F62", "#A98E5F", "#C58A6A"],
        p
      ) as unknown as string;
      el.style.backgroundColor = c;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
      <div
        ref={bar}
        className="h-full w-full origin-left bg-sage"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
