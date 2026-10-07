/**
 * Apertura: un velo di luce calda con il cristallo che si apre in ~1 s (effetto condiviso con il Nido),
 * al posto del vecchio conteggio 0→100. Solo CSS: si apre da solo anche se il JavaScript
 * arriva tardi, quindi la pagina è leggibile e toccabile subito.
 */
export default function Preloader() {
  return (
    <div aria-hidden className="pincio-velo pointer-events-none fixed inset-0 z-[100] flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-mark.svg" alt="" className="pincio-velo__mark h-20 w-auto" />
    </div>
  );
}
