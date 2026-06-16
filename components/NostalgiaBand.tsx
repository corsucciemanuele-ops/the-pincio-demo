"use client";

import HeadingReveal from "./HeadingReveal";

/**
 * The nostalgia lever for the ex-Pineta audience, placed high (right after the
 * hero), not just at the close.
 */
export default function NostalgiaBand() {
  return (
    <section className="relative bg-cream">
      <div className="container-edge py-20 text-center sm:py-28">
        <HeadingReveal
          className="mx-auto max-w-3xl font-display text-[clamp(1.6rem,4vw,3.2rem)] font-light leading-[1.12] text-ink"
          lines={[
            "Tutti sanno cosa è stato.",
            <em key="i" className="italic text-sage">Presto saprete cosa diventerà.</em>,
          ]}
        />
      </div>
    </section>
  );
}
