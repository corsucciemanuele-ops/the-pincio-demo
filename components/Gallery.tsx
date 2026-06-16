"use client";

import HeadingReveal from "./HeadingReveal";
import Reveal from "./Reveal";

/**
 * Gallery — reserved for real Pincio pool photography. Empty/placeholder by
 * design until those shots exist (no restaurant/lake imagery here).
 */
export default function Gallery() {
  return (
    <section id="gallery" className="relative overflow-hidden bg-ink">
      <div className="container-edge py-28 sm:py-36">
        <div className="mb-6 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark-white.png" alt="" className="h-6 w-auto opacity-85" />
          <p className="label text-cream/55">Gallery</p>
        </div>

        <HeadingReveal
          className="max-w-2xl font-display text-[clamp(2rem,4.6vw,3.8rem)] font-light leading-[1.04] text-cream"
          lines={["Una stagione,", <em key="i" className="italic text-pool-light">a bordo piscina.</em>]}
        />

        <Reveal className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              data-reveal-child
              className="flex aspect-[4/5] items-center justify-center rounded-[3px] border border-cream/10 bg-cream/[0.03]"
            >
              <span className="text-cream/15">✦</span>
            </div>
          ))}
        </Reveal>
        <p className="label mt-8 text-cream/40">Le foto della piscina, presto.</p>
      </div>
    </section>
  );
}
