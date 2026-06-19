"use client";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div className="container-edge py-20 sm:py-28">
        <div className="grid grid-cols-1 gap-10 border-t border-cream/15 pt-12 sm:grid-cols-3">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.svg" alt="" className="h-11 w-auto opacity-90" />
            <span className="font-display text-2xl text-cream">The Pincio</span>
          </div>
          <div className="space-y-2">
            <p className="label text-cream/45">The Pincio · Pool · Bites · Bar</p>
            <p className="label text-cream/45">Estate 2027 · Sul colle, a bordo piscina</p>
          </div>
          <div className="space-y-2 sm:text-right">
            <p className="label text-cream/45">Via Colle Igea 22/B — Sassocorvaro Auditore (PU)</p>
            <p className="label text-cream/45">© Pincio di Valentini Annita Srl</p>
          </div>
        </div>
      </div>

      {/* Oversized watermark — more visible + premium gradient, fully shown */}
      <div aria-hidden className="pointer-events-none select-none px-4">
        <p className="bg-gradient-to-b from-cream/[0.16] to-cream/[0.03] bg-clip-text text-center font-display text-[27vw] font-light leading-[0.82] text-transparent">
          Pincio
        </p>
      </div>
    </footer>
  );
}
