/**
 * Montefeltro ridgeline — a soft hill silhouette used as a parallax mid-layer.
 */
export default function Ridge({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 220 L0 150 C 120 120 200 90 340 110 C 480 130 560 70 700 78 C 820 85 900 40 1040 64 C 1180 88 1280 120 1440 96 L1440 220 Z"
        fill="currentColor"
      />
    </svg>
  );
}
