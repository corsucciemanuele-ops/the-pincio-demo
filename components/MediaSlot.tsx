"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { getMedia } from "@/lib/media";

type Props = {
  /** key into the MEDIA registry */
  slot: string;
  /** graded placeholder shown until a real asset is wired in */
  poster: string;
  className?: string;
  /** disable the cinematic enter (e.g. for the always-visible hero) */
  reveal?: boolean;
  children?: React.ReactNode;
  /** overlay gradient on top of the media for legibility */
  overlay?: string;
};

/**
 * A drop-in media frame. Renders a graded gradient placeholder now; when a
 * real video/image is registered in lib/media it swaps in automatically.
 * Enters cinematically: a clip-path wipe + scale-down + de-blur on scroll.
 */
export default function MediaSlot({
  slot,
  poster,
  className = "",
  reveal = true,
  children,
  overlay,
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const entry = getMedia(slot);
  // Hide the media (show placeholder) if the file can't load yet.
  const [failed, setFailed] = useState(false);
  const media = failed ? null : entry;

  // Video: la foto fissa è subito visibile; il video si scarica solo dopo il caricamento
  // della pagina, mai con Risparmio dati o rete lenta (2G/3G). Telefono e computer hanno file diversi.
  const [videoOn, setVideoOn] = useState(false);
  useEffect(() => {
    const v = video.current;
    if (!v || media?.type !== "video") return;
    let annullato = false;
    const avvia = () => {
      if (annullato) return;
      const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
      if (c && (c.saveData || /(^|-)2g|3g/.test(c.effectiveType || ""))) return;
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      v.src = (mobile && media.srcMobile) || media.src;
      v.muted = true;
      v.defaultMuted = true;
      v.addEventListener("playing", () => setVideoOn(true), { once: true });
      v.play().catch(() => {});
    };
    const dopo = () => window.setTimeout(avvia, 400);
    if (document.readyState === "complete") dopo();
    else window.addEventListener("load", dopo, { once: true });
    return () => { annullato = true; window.removeEventListener("load", dopo); };
  }, [media?.type, media?.src, media?.srcMobile]);

  useEffect(() => {
    const el = inner.current;
    if (!el || !reveal || prefersReducedMotion()) return;
    const tween = gsap.fromTo(
      el,
      { clipPath: "inset(14% 14% 14% 14% round 4px)", scale: 1.16, filter: "blur(14px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 4px)",
        scale: 1,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reveal]);

  return (
    <div ref={root} className={`relative overflow-hidden ${className}`}>
      <div ref={inner} className="absolute inset-0 h-full w-full">
        {/* graded placeholder — always present, also acts as <video> poster */}
        <div className="absolute inset-0" style={{ background: poster }} />
        {media?.type === "video" && (
          <>
            {media.poster && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={media.poster}
                alt=""
                fetchPriority={reveal ? "auto" : "high"}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <video
              ref={video}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${videoOn ? "opacity-100" : "opacity-0"}`}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
              onError={() => setFailed(true)}
            />
          </>
        )}
        {media?.type === "image" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={media.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        )}
        {overlay && <div className="absolute inset-0" style={{ background: overlay }} />}
      </div>
      {children}
    </div>
  );
}
