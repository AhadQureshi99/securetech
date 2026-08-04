"use client";

import { createElement, useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { DUR, GSAP_EASE, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SplitRevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Seconds before the first line starts. */
  delay?: number;
  stagger?: number;
  /** ScrollTrigger `start`. Ignored when `immediate`. */
  start?: string;
  /** Play on mount instead of on scroll — for above-the-fold copy. */
  immediate?: boolean;
  /** Reveal word-by-word rather than line-by-line. */
  by?: "lines" | "words";
};

/**
 * Masked type reveal built on GSAP SplitText.
 *
 * `autoSplit` re-splits after webfonts land and on resize, which is the fix
 * for the classic bug where lines are measured against the fallback font and
 * the mask ends up clipping the wrong rows. Returning the tween from
 * `onSplit` lets GSAP tear it down and rebuild it on each re-split.
 */
export function SplitReveal({
  children,
  as = "h2",
  className,
  delay = 0,
  stagger = STAGGER.line,
  start = "top 85%",
  immediate = false,
  by = "lines",
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1 });
        return;
      }

      const split = SplitText.create(el, {
        type: by,
        mask: by,
        linesClass: "split-line",
        wordsClass: "split-word",
        autoSplit: true,
        onSplit: (self) => {
          const targets = by === "lines" ? self.lines : self.words;
          // Unhide only once the mask wrappers exist, so unsplit text never
          // flashes at full width first.
          gsap.set(el, { opacity: 1 });
          return gsap.from(targets, {
            yPercent: 110,
            duration: DUR.reveal,
            stagger,
            delay,
            ease: GSAP_EASE.out,
            scrollTrigger: immediate
              ? undefined
              : { trigger: el, start, once: true },
          });
        },
      });

      return () => split.revert();
    },
    { scope: ref },
  );

  return createElement(
    as,
    { ref, className: cn("split-mask", className), "data-anim": "hidden" },
    children,
  );
}
