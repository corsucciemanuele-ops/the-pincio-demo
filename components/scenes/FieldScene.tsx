"use client";

import DepthScene from "../depth/DepthScene";
import Layer from "../depth/Layer";
import { Grain, Vignette, Bloom } from "../depth/Atmosphere";
import MediaSlot from "../MediaSlot";

type Props = {
  /** graded base gradient (also the poster for a real asset) */
  poster: string;
  /** drifting light field (radial), parallaxed in front */
  light?: string;
  /** near, heavily-blurred haze for depth-of-field foreground */
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
 * A premium, abstract, graded environment: a base colour field (or real-media
 * slot) with translucent light/haze planes drifting in front at different
 * depths. No illustration — depth and grade only. The spine of every section.
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
  return (
    <DepthScene className={className} intensity={intensity}>
      <Layer depth={5} scroll={5} scale={1.12}>
        {slot ? (
          <MediaSlot slot={slot} poster={poster} reveal={false} className="h-full w-full" />
        ) : (
          <div className="h-full w-full" style={{ background: poster }} />
        )}
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
