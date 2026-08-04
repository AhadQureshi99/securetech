"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Scrub-linked drift. Transform-only and deliberately small — parallax that
 * moves far enough to notice is parallax that has detached an element from
 * whatever it belongs to.
 */
export function Parallax({
  children,
  className,
  amount = 8,
  rotate = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Total travel in percent of the element's own height. */
  amount?: number;
  /** Degrees of rotation across the same range. */
  rotate?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      gsap.fromTo(
        el,
        { yPercent: -amount / 2, rotate: -rotate / 2 },
        {
          yPercent: amount / 2,
          rotate: rotate / 2,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
