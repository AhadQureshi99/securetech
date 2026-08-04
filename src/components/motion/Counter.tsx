"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { GSAP_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered number tween. Decelerates into place on the same expo
 * curve as everything else, and renders with tabular figures so the width
 * does not jitter while counting.
 */
export function Counter({
  to,
  prefix = "",
  suffix = "",
  className,
  duration = 1.6,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        el.textContent = `${prefix}${to}${suffix}`;
        return;
      }

      const state = { value: 0 };
      gsap.to(state, {
        value: to,
        duration,
        ease: GSAP_EASE.out,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(state.value)}${suffix}`;
        },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={cn("tnum", className)}>
      {prefix}
      {to}
      {suffix}
    </span>
  );
}
