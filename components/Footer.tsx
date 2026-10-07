"use client";

import { LINKS } from "@/lib/links";

const NIDO_UTM = "?utm_source=thepincio&utm_medium=referral&utm_campaign=il_colle&utm_content=footer";

/**
 * Footer comune "Il Colle": stessa struttura del Nido del Corvo (contatti 2×2, firma,
 * riga Il Colle · Nido del Corvo · The Pincio). Diverso solo l'accento: acqua e pietra.
 * "Il Colle ↺" (rivedi l'intro) compare solo su computer: vedi .foot-rivedi in globals.css.
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div className="container-edge pb-10 pt-16 sm:pt-24">
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 border-t border-cream/15 pt-8 sm:grid-cols-4">
          <div>
            <h2 className="mb-2 text-[12px] font-medium uppercase tracking-[0.24em] text-cream/60">Info e prenotazioni eventi</h2>
            <ul className="space-y-1 text-base leading-relaxed">
              <li><a href="tel:+39072276334" className="inline-flex min-h-[32px] items-center underline decoration-cream/30 underline-offset-4">+39 0722 76334</a></li>
              <li><a href="mailto:info@thepincio.it" className="inline-flex min-h-[32px] items-center underline decoration-cream/30 underline-offset-4">info@thepincio.it</a></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-2 text-[12px] font-medium uppercase tracking-[0.24em] text-cream/60">Dove</h2>
            <p className="text-base leading-relaxed">Via Colle Igea 22/B<br />Sassocorvaro Auditore (PU)</p>
          </div>
          <div>
            <h2 className="mb-2 text-[12px] font-medium uppercase tracking-[0.24em] text-cream/60">Orari</h2>
            <p className="text-base leading-relaxed">Apertura estate 2027</p>
          </div>
          <div>
            <h2 className="mb-2 text-[12px] font-medium uppercase tracking-[0.24em] text-cream/60">The Pincio</h2>
            <p className="text-base leading-relaxed">Pool · Bites · Bar<br />Sul colle, a bordo piscina</p>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.svg" alt="" className="h-11 w-auto opacity-90" />
          <span className="font-display text-2xl text-cream">The Pincio</span>
        </div>

        <p className="mt-6 flex flex-wrap items-center gap-x-3 text-[13px] font-medium uppercase tracking-[0.22em] text-cream/75">
          <a href="/?ilcolle=1" className="foot-rivedi min-h-[44px] items-center" title="Rivedi il volo sul colle">Il Colle ↺</a>
          <span className="foot-colle-testo">Il Colle</span>
          <span aria-hidden className="opacity-45">·</span>
          <a href={LINKS.NIDO + NIDO_UTM} target="_blank" rel="noopener" className="inline-flex min-h-[44px] items-center">Nido del Corvo ↗</a>
          <span aria-hidden className="opacity-45">·</span>
          <a href="/" aria-current="page" className="inline-flex min-h-[44px] items-center text-cream">The Pincio</a>
        </p>

        <div className="mt-6 flex flex-wrap justify-between gap-x-5 gap-y-2 border-t border-cream/15 pt-5 text-[13px] text-cream/55">
          <span>The Pincio · Pool · Bites · Bar — Estate 2027</span>
          <span>© Pincio di Valentini Annita Srl</span>
        </div>
      </div>

      {/* Oversized watermark */}
      <div aria-hidden className="pointer-events-none select-none px-4">
        <p className="bg-gradient-to-b from-cream/[0.16] to-cream/[0.03] bg-clip-text text-center font-display text-[27vw] font-light leading-[0.82] text-transparent">
          Pincio
        </p>
      </div>
    </footer>
  );
}
