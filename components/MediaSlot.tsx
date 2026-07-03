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

  // A launch-time error (flaky network/decoder, common in the installed PWA)
  // must not hide the video forever: retry a couple of times, then give up.
  const videoRetries = useRef(0);
  const onVideoError = () => {
    const v = video.current;
    if (v && videoRetries.current < 2) {
      videoRetries.current += 1;
      setTimeout(() => {
        v.load();
        v.play().catch(() => {});
      }, 900 * videoRetries.current);
    } else {
      setFailed(true);
    }
  };

  // iOS/Safari: guarantee muted-inline autoplay (otherwise a play button shows).
  // In standalone PWA mode autoplay is stricter (e.g. Low Power Mode) and the
  // pipeline can stall on launch, so retry on media events, on first gesture,
  // and when the app returns visible; reload the element once if it never loads.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    let reloaded = false;
    const tryPlay = () => {
      if (!v.isConnected || !v.paused) return;
      v.play().catch(() => {
        if (!reloaded && v.readyState === 0) {
          reloaded = true;
          v.load();
        }
      });
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    const gesture = { passive: true } as AddEventListenerOptions;
    const removeGestures = () => {
      window.removeEventListener("touchstart", tryPlay);
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("scroll", tryPlay);
    };
    tryPlay();
    v.addEventListener("loadedmetadata", tryPlay);
    v.addEventListener("canplay", tryPlay);
    // once actually playing, the gesture fallbacks are no longer needed
    v.addEventListener("playing", removeGestures);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("touchstart", tryPlay, gesture);
    window.addEventListener("click", tryPlay, gesture);
    window.addEventListener("scroll", tryPlay, gesture);
    return () => {
      v.removeEventListener("loadedmetadata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
      v.removeEventListener("playing", removeGestures);
      document.removeEventListener("visibilitychange", onVisible);
      removeGestures();
    };
  }, [media?.src]);

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
          // src directly on <video> (not a <source> child): more reliable for
          // autoplay on iOS, especially in installed-PWA/standalone mode.
          <video
            ref={video}
            src={media.src}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={media.poster}
            onError={onVideoError}
          />
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
