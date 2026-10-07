"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LINKS } from "@/lib/links";

/**
 * Intro "Il Colle": strato condiviso con il sito del Nido del Corvo (public/ilcolle/).
 * Sta sopra la pagina vera, che resta sotto e si legge. Prima visita completa, poi si
 * entra direttamente; app installata aperta dall'icona mai; ?from=ilcolle (arrivo dal Nido)
 * la salta; ?ilcolle=1 (link nel footer) la riapre.
 * Indipendente dal resto della pagina: si può tenere anche sulla futura schermata di pre-apertura.
 */
export default function IlColle() {
  useEffect(() => {
    let annullato = false;
    const w = window as unknown as { gsap?: typeof gsap; ScrollTrigger?: typeof ScrollTrigger; __lenis?: unknown };
    w.gsap = gsap;
    w.ScrollTrigger = ScrollTrigger;
    const src = "/ilcolle/js/ilcolle.js";
    import(/* webpackIgnore: true */ src)
      .then((m: { deveMostrare: () => boolean; montaIlColle: (o: object) => void }) => {
        if (annullato) return;
        const mostra = m.deveMostrare();
        // il link "Il Colle" del footer vale una volta: ricaricando non riparte
        if (/[?&]ilcolle=1\b/.test(location.search)) history.replaceState(null, "", location.pathname + location.hash);
        if (!mostra) return;
        m.montaIlColle({
          sito: "pincio",
          links: { nido: LINKS.NIDO, pincio: LINKS.PINCIO },
          lenis: w.__lenis,
          onFine: () => ScrollTrigger.refresh(),
        });
      })
      .catch(() => {});
    return () => { annullato = true; };
  }, []);
  return null;
}
