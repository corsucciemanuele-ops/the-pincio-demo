"use client";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div className="container-edge py-24 text-center sm:py-28">
        {/* Clean, contained brand sign-off (vector logo) — premium, never cut */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-white.svg"
          alt="The Pincio"
          className="mx-auto w-[min(62vw,300px)] opacity-90"
        />
        <p className="label mt-6 text-cream/45">Estate 2027 · Sul colle, a bordo piscina</p>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 border-t border-cream/12 pt-10 text-center sm:grid-cols-3 sm:text-left">
          <p className="label text-cream/45">The Pincio · Pool · Bites · Bar</p>
          <p className="label text-cream/45 sm:text-center">
            Via Colle Igea 22/B<br className="hidden sm:block" /> Sassocorvaro Auditore (PU)
          </p>
          <p className="label text-cream/45 sm:text-right">© Pincio di Valentini Annita Srl</p>
        </div>
      </div>
    </footer>
  );
}
