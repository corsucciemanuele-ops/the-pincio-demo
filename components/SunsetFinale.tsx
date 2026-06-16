"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import MediaSlot from "./MediaSlot";

/**
 * The WOW finale, now on real footage. The sunset clip plays full-bleed; as you
 * scroll, a scrubbed timeline deepens it toward night, ignites soft lights, and
 * resolves the Pincio logo. The sun/sky motion comes from the real video.
 */
const GLINTS = [
  { l: 18, t: 30, s: 10 }, { l: 32, t: 22, s: 7 }, { l: 46, t: 34, s: 12 },
  { l: 60, t: 24, s: 8 }, { l: 72, t: 32, s: 11 }, { l: 84, t: 26, s: 7 },
  { l: 26, t: 46, s: 9 }, { l: 54, t: 48, s: 8 }, { l: 78, t: 44, s: 10 },
];

const POSTER =
  "linear-gradient(to bottom,#241F4E 0%,#6E4670 28%,#DC6F88 48%,#F4A06E 64%,#2C2640 100%)";

export default function SunsetFinale() {
  const trigger = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trigger.current;
    const st = stage.current;
    if (!el || !st) return;
    const q = gsap.utils.selector(st);

    if (prefersReducedMotion()) {
      gsap.set(q(".finale-night"), { autoAlpha: 0.7 });
      gsap.set(q(".lights"), { autoAlpha: 1 });
      gsap.set(q(".finale-logo"), { autoAlpha: 1, scale: 1 });
      gsap.set(q(".finale-tag"), { autoAlpha: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 1 },
      });
      // night falls over the real footage
      tl.fromTo(".finale-night", { autoAlpha: 0 }, { autoAlpha: 0.72, ease: "power1.in", duration: 1 }, 0);
      // lights ignite
      tl.to(".lights", { autoAlpha: 1, duration: 0.3 }, 0.55);
      // logo resolves — the moment
      tl.fromTo(".finale-logo",
        { autoAlpha: 0, scale: 0.86, filter: "blur(8px)" },
        { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.3, ease: "power2.out" }, 0.72)
        .fromTo(".finale-tag", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.2 }, 0.84);
    }, st);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={trigger} id="sunset" className="relative h-[320vh] bg-indigo">
      <div ref={stage} className="sticky top-0 h-[100svh] overflow-hidden">
        {/* real sunset footage */}
        <MediaSlot slot="sunset" poster={POSTER} reveal={false} className="absolute inset-0 h-full w-full" />

        {/* night fall */}
        <div className="finale-night absolute inset-0 opacity-0" style={{ background: "linear-gradient(to bottom,#070B26 0%,#1A1E40 55%,#3A2740 100%)" }} />

        {/* soft lights */}
        <div className="lights absolute inset-0 opacity-0">
          {GLINTS.map((g, i) => (
            <span key={i} className="absolute rounded-full" style={{ left: `${g.l}%`, top: `${g.t}%`, width: g.s, height: g.s, background: "radial-gradient(circle, rgba(255,224,170,0.95), rgba(255,200,140,0) 70%)", boxShadow: "0 0 18px 6px rgba(255,210,150,0.5)" }} />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 42%, transparent 52%, rgba(6,6,22,0.6) 120%)" }} />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
          <div className="finale-logo flex flex-col items-center opacity-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-white.png" alt="The Pincio" className="w-[min(72vw,440px)] drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)]" />
          </div>
          <p className="finale-tag mt-6 font-display text-2xl italic text-white/90 opacity-0 drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)] sm:text-3xl">
            L&apos;estate ha un indirizzo.
          </p>
        </div>

        <p className="label absolute bottom-7 left-1/2 -translate-x-1/2 text-white/40">Sunset Experience</p>
      </div>
    </section>
  );
}
