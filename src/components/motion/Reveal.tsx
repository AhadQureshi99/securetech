"use client";

import { createElement, useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { DUR, GSAP_EASE, SHIFT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Travel distance in px. */
  y?: number;
  x?: number;
  delay?: number;
  /** When set, the element's direct children animate in sequence instead. */
  stagger?: number;
  start?: string;
  /** Play on mount rather than on scroll. */
  immediate?: boolean;
  blur?: boolean;
};

/**
 * Scroll-driven fade and rise. GSAP rather than Framer's `whileInView` so it
 * shares one ScrollTrigger instance and one ticker with Lenis — mixing two
 * scroll observers is what produces reveals that fire a frame late.
 */
export function Reveal({
  children,
  as = "div",
  className,
  y = SHIFT.base,
  x = 0,
  delay = 0,
  stagger,
  start = "top 85%",
  immediate = false,
  blur = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const targets: Element | Element[] = stagger
        ? Array.from(el.children)
        : el;

      if (prefersReducedMotion()) {
        gsap.set(targets, { opacity: 1, y: 0, x: 0, filter: "none" });
        gsap.set(el, { opacity: 1 });
        return;
      }

      if (stagger) gsap.set(el, { opacity: 1 });

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y,
          x,
          ...(blur ? { filter: "blur(10px)" } : null),
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          ...(blur ? { filter: "blur(0px)" } : null),
          duration: DUR.slow,
          ease: GSAP_EASE.out,
          delay,
          stagger,
          scrollTrigger: immediate ? undefined : { trigger: el, start, once: true },
        },
      );
    },
    { scope: ref },
  );

  return createElement(
    as,
    { ref, className: cn(className), "data-anim": "hidden" },
    children,
  );
}
