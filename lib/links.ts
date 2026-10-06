/**
 * Link tra i due locali del Colle.
 * Nido del Corvo: indirizzo pubblico futuro nidodelcorvo.it; per le prove si imposta
 * NEXT_PUBLIC_NIDO_URL (es. http://192.168.1.51:8767/).
 */
export const LINKS = {
  NIDO: process.env.NEXT_PUBLIC_NIDO_URL || "https://nidodelcorvo.it/",
  PINCIO: process.env.NEXT_PUBLIC_PINCIO_URL || "/", // il sito stesso (futuro thepincio.it)
};
