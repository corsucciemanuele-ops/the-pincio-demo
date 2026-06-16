"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { Festoon, Bokeh } from "./scenes/primitives";

/**
 * The WOW finale. As you scroll the sun sinks, the sky cycles day → golden →
 * dusk → night, the festoon lights ignite, and the logo resolves.
 * A sticky stage driven by a single scrubbed timeline.
 */
export default function SunsetFinale() {
  const trigger = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trigger.current;
    const st = stage.current;
    if (!el || !st) return;

    const q = gsap.utils.selector(st);
    const reduced = prefersReducedMotion();

    if (reduced) {
      gsap.set(q(".sky-night"), { autoAlpha: 1 });
      gsap.set(q(".lights"), { autoAlpha: 1 });
      gsap.set(q(".finale-logo"), { autoAlpha: 1, scale: 1 });
      gsap.set(q(".sun"), { autoAlpha: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Sun sinks through the frame and reddens as it sets.
      tl.fromTo(
        ".sun",
        { yPercent: -40, backgroundColor: "#FFF4D8", boxShadow: "0 0 120px 50px rgba(255,240,200,0.8)" },
        { yPercent: 120, backgroundColor: "#E2542F", boxShadow: "0 0 90px 30px rgba(226,90,50,0.6)", ease: "power1.in", duration: 1 },
        0
      );

      // Sky crossfades day → golden → dusk → night.
      tl.to(".sky-golden", { autoAlpha: 1, duration: 0.3 }, 0.1)
        .to(".sky-dusk", { autoAlpha: 1, duration: 0.3 }, 0.4)
        .to(".sky-night", { autoAlpha: 1, duration: 0.35 }, 0.62);

      // Lights ignite as it darkens.
      tl.to(".lights", { autoAlpha: 1, duration: 0.25 }, 0.66);

      // Reflection on the water darkens.
      tl.to(".finale-water", { autoAlpha: 0.9, duration: 0.4 }, 0.5);

      // Logo resolves last — the moment.
      tl.fromTo(
        ".finale-logo",
        { autoAlpha: 0, scale: 0.86, filter: "blur(8px)" },
        { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.3, ease: "power2.out" },
        0.78
      ).fromTo(
        ".finale-tag",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.2 },
        0.88
      );
    }, st);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={trigger} id="sunset" className="relative h-[320vh] bg-indigo">
      <div ref={stage} className="sticky top-0 h-[100svh] overflow-hidden">
        {/* sky stack */}
        <div className="sky-day absolute inset-0" style={{ background: "linear-gradient(to bottom,#7FD6DC 0%,#BFE3D6 40%,#F3E7C9 70%)" }} />
        <div className="sky-golden absolute inset-0 opacity-0" style={{ background: "linear-gradient(to bottom,#FFD89A 0%,#F6A56E 45%,#D77A7E 75%)" }} />
        <div className="sky-dusk absolute inset-0 opacity-0" style={{ background: "linear-gradient(to bottom,#5A4A86 0%,#B5527E 45%,#F0876B 78%)" }} />
        <div className="sky-night absolute inset-0 opacity-0" style={{ background: "linear-gradient(to bottom,#0B1030 0%,#232A55 45%,#6E4A6E 80%)" }} />

        {/* sun */}
        <div className="sun absolute left-1/2 top-[34%] h-32 w-32 -translate-x-1/2 rounded-full" style={{ background: "#FFF4D8" }} />

        {/* water reflection band */}
        <div className="finale-water absolute inset-x-0 bottom-0 opacity-40" style={{ height: "34%", background: "linear-gradient(to bottom, rgba(255,200,150,0.5), rgba(20,20,50,0.9))" }} />

        {/* lights that ignite */}
        <div className="lights absolute inset-0 opacity-0">
          <div className="absolute inset-x-0 top-0" style={{ height: "42%" }}>
            <Festoon glow="#FFD79A" />
          </div>
          <div className="absolute inset-x-0" style={{ top: "52%", height: "26%" }}>
            <Bokeh color="255,200,140" count={26} seed={11} />
          </div>
        </div>

        {/* vignette */}
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(8,8,24,0.55) 120%)" }} />

        {/* logo — the resolve */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
          <div className="finale-logo flex flex-col items-center opacity-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-cut.png" alt="The Pincio" className="h-44 w-auto drop-shadow-[0_8px_40px_rgba(0,0,0,0.5)] sm:h-56" />
          </div>
          <p className="finale-tag mt-6 font-display text-2xl italic text-white/90 opacity-0 drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)] sm:text-3xl">
            L&apos;estate ha un indirizzo.
          </p>
        </div>

        {/* scroll hint */}
        <p className="label absolute bottom-7 left-1/2 -translate-x-1/2 text-white/40">
          Sunset Experience
        </p>
      </div>
    </section>
  );
}
