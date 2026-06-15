/**
 * The Pincio mark — a faceted crystal/seed, drawn as a hairline.
 * Quiet, gold, never loud.
 */
export default function Crystal({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
        <path d="M20 3c6 5 9 11 9 18 0 9-4 16-9 24-5-8-9-15-9-24 0-7 3-13 9-18Z" />
        <path d="M11 21c4 3 6 4 9 4s5-1 9-4" />
        <path d="M20 3v42" opacity="0.5" />
        <path d="M13.5 11c3 2.5 9.9 2.5 13 0" opacity="0.5" />
      </g>
    </svg>
  );
}
