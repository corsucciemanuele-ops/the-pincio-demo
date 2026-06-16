"use client";

import { useEffect, useRef } from "react";
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
  const media = getMedia(slot);

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
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={media.poster}
          >
            <source src={media.src} />
          </video>
        )}
        {media?.type === "image" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={media.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
        )}
        {overlay && <div className="absolute inset-0" style={{ background: overlay }} />}
      </div>
      {children}
    </div>
  );
}
