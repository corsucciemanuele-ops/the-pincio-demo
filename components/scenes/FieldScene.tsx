"use client";

import DepthScene from "../depth/DepthScene";
import Layer from "../depth/Layer";
import { Grain, Vignette, Bloom } from "../depth/Atmosphere";
import MediaSlot from "../MediaSlot";
import { getMedia } from "@/lib/media";

type Props = {
  /** graded base gradient (also the poster for a real asset) */
  poster: string;
  /** drifting light field (radial), parallaxed in front — placeholder mode only */
  light?: string;
  /** near, heavily-blurred haze — placeholder mode only */
  nearHaze?: string;
  bloom?: { x: number; y: number; color: string; size: number };
  /** if set, becomes a swappable media slot for real photo/video */
  slot?: string;
  grain?: number;
  vignette?: number;
  intensity?: number;
  className?: string;
};

/**
 * Adaptive scene.
 *  - Placeholder mode (no real asset): a graded colour field with translucent
 *    light/haze planes drifting in front at different depths — depth + grade.
 *  - Media mode (a real photo/video is registered): the media leads, with only
 *    a light grade, grain and vignette on top so footage stays crisp.
 */
export default function FieldScene({
  poster,
  light,
  nearHaze,
  bloom,
  slot,
  grain = 0.05,
  vignette = 0.34,
  intensity = 0.9,
  className = "absolute inset-0",
}: Props) {
  const hasMedia = slot ? !!getMedia(slot) : false;

  if (hasMedia && slot) {
    return (
      <DepthScene className={className} intensity={intensity * 0.6}>
        <Layer depth={5} scroll={6} scale={1.08}>
          <MediaSlot slot={slot} poster={poster} reveal={false} className="h-full w-full" />
        </Layer>
        {/* light, photographic grade only */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(20,16,30,0.18) 0%, transparent 28%, transparent 64%, rgba(8,20,28,0.34) 100%)" }}
        />
        <Grain opacity={Math.min(grain, 0.035)} />
        <Vignette strength={Math.min(vignette, 0.3)} />
      </DepthScene>
    );
  }

  return (
    <DepthScene className={className} intensity={intensity}>
      <Layer depth={5} scroll={5} scale={1.12}>
        <div className="h-full w-full" style={{ background: poster }} />
      </Layer>
      {light && (
        <Layer depth={18} scroll={11} blur={26}>
          <div className="h-full w-full" style={{ background: light }} />
        </Layer>
      )}
      {nearHaze && (
        <Layer depth={60} scroll={7} blur={40}>
          <div className="absolute inset-x-0 bottom-0" style={{ height: "46%", background: nearHaze }} />
        </Layer>
      )}
      {bloom && <Bloom x={bloom.x} y={bloom.y} color={bloom.color} size={bloom.size} />}
      <Grain opacity={grain} />
      <Vignette strength={vignette} />
    </DepthScene>
  );
}
