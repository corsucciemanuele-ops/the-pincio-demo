"use client";

import { useRef, useCallback } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
};

/**
 * A button that leans gently toward the cursor. Restrained — a few pixels,
 * not a trampoline.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  strength = 0.35,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const reduced = useRef(prefersReducedMotion());

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduced.current || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(ref.current, {
        x: x * strength,
        y: y * strength,
        duration: 0.6,
        ease: "power3.out",
      });
    },
    [strength]
  );

  const onLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.9,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  const common = {
    ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    className: `magnetic inline-flex items-center justify-center ${className}`,
  };

  if (href) {
    return (
      <a {...common} href={href} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button {...common} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
