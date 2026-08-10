"use client";

import { useEffect, useRef } from "react";
import { ProductCard } from "@/components/cards/ProductCard";
import type { Product } from "@/data/products";

/**
 * Horizontal product rail, matching the interaction on cantor8.io's Product
 * Suite section.
 *
 * I inspected that section rather than guessing at it, and it is not a GSAP
 * pin — there are no pin-spacers on the page and its `.products` ScrollTrigger
 * carries no animation. The mechanism is:
 *
 *   1. A tall runway element sets how long the section lasts.
 *   2. A `position: sticky; top: 0; height: 100vh` viewport inside it, with
 *      `overflow-x: hidden`.
 *   3. A flex track of cards. Scroll progress through the runway maps to a
 *      shared horizontal offset, and **each card is transformed individually**
 *      — same x, but its own y and scale.
 *
 * The three details that give it its character, all reproduced here:
 *
 *   • **Vertical stagger.** Cards sit on a repeating `[0, +100, 0, -120]px`
 *     pattern, so the row reads as a drifting wave rather than a rigid strip.
 *   • **Approach scale.** A card enters at 0.7 and reaches 1.0 only once its
 *     centre crosses a focus line ~22% in from the left, so cards visibly
 *     grow as they travel toward you.
 *   • **Lerp smoothing at 0.14.** The track chases the scroll-derived target
 *     rather than snapping to it, which is what produces the weight.
 *
 * Written from the observed behaviour, not copied — but the numbers are
 * deliberately the same so the feel matches.
 *
 * Below 992px, and under reduced-motion, every transform is dropped and the
 * rail becomes a plain native swipe strip.
 */

/** Repeating vertical offsets, in px. */
const Y_PATTERN = [0, 100, 0, -120];

/** Scroll distance consumed per pixel of horizontal travel. */
const RUNWAY_RATIO = 1.475;

/** How hard the track chases its target. Lower = heavier. */
const LERP = 0.14;

export function ProductScroller({
  products,
  tone = "dark",
}: {
  products: readonly Product[];
  /** Card surface. The home rail sits on navy; the Products rails on white. */
  tone?: "light" | "dark";
}) {
  const wrapper = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = items.current.filter((el): el is HTMLDivElement => Boolean(el));
    if (!wrapper.current || !box.current || cards.length === 0) return;

    // Aliased as non-null locals: the helpers below are hoisted function
    // declarations, and TS will not carry a narrowing across that boundary.
    const wrapperEl: HTMLDivElement = wrapper.current;
    const boxEl: HTMLDivElement = box.current;

    const wide = window.matchMedia("(min-width: 992px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let currentX = 0;
    let targetX = 0;
    let startX = 0;
    let moveX = 0;
    let raf = 0;
    let ticking = false;
    let active = false;
    let resizeTimer: ReturnType<typeof setTimeout>;

    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const autoY = (i: number) => Y_PATTERN[i % Y_PATTERN.length];

    /** 0.7 offscreen-right, easing to 1.0 at the focus line. */
    function cardScale(vx: number, cardW: number, vw: number) {
      const centre = vx + cardW * 0.5;
      const fromX = vw + cardW * 0.5;
      const toX = Math.max(120, vw * 0.22);
      const t = clamp((fromX - centre) / (fromX - toX), 0, 1);
      return 0.7 + 0.3 * t;
    }

    function reset() {
      cards.forEach((el) => {
        el.style.transform = "";
      });
      wrapperEl.style.height = "";
    }

    function measure() {
      if (!wide.matches || reduce.matches) {
        active = false;
        reset();
        return false;
      }
      active = true;

      // Start with the third card's right edge just inside the frame, so the
      // rail opens on three cards rather than a full row.
      const third = cards[2] ?? cards[cards.length - 1];
      const last = cards[cards.length - 1];
      const frame = boxEl.clientWidth;

      startX = frame - (third.offsetLeft + third.offsetWidth) - 16;
      const endX = frame - frame * 0.15 - (last.offsetLeft + last.offsetWidth);
      moveX = Math.max(1, startX - endX);

      // Runway length derived from travel, so pacing holds at any card count
      // or viewport width.
      wrapperEl.style.height = `${window.innerHeight + moveX * RUNWAY_RATIO}px`;

      currentX = startX;
      targetX = startX;
      return true;
    }

    function updateTarget() {
      const maxScroll = Math.max(1, wrapperEl.offsetHeight - window.innerHeight);
      const passed = clamp(-wrapperEl.getBoundingClientRect().top, 0, maxScroll);
      targetX = startX - moveX * (passed / maxScroll);
    }

    function render() {
      ticking = false;
      currentX = lerp(currentX, targetX, LERP);

      const boxLeft = boxEl.getBoundingClientRect().left;
      const vw = window.innerWidth;

      cards.forEach((el, i) => {
        const vx = boxLeft + el.offsetLeft + currentX;
        const s = cardScale(vx, el.offsetWidth, vw);
        el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${autoY(i)}px, 0) scale(${s.toFixed(3)})`;
      });

      // Keep ticking only while there is distance left to close.
      if (Math.abs(currentX - targetX) > 0.2) {
        raf = requestAnimationFrame(render);
        ticking = true;
      } else {
        raf = 0;
      }
    }

    function request() {
      if (!active) return;
      updateTarget();
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(render);
      }
    }

    function remeasure() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (measure()) request();
      }, 200);
    }

    if (measure()) request();

    // Measure again once the web fonts have landed. The first pass runs during
    // commit, and on a cold load that can be before the card text has its final
    // metrics — which leaves the runway sized for a layout that no longer
    // exists and the rail short of its last card.
    let settled = false;
    const settle = () => {
      if (settled) return;
      settled = true;
      if (measure()) request();
    };
    if (document.fonts?.status === "loaded") {
      requestAnimationFrame(settle);
    } else {
      document.fonts?.ready.then(settle).catch(() => {});
    }

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", remeasure, { passive: true });
    wide.addEventListener("change", remeasure);
    reduce.addEventListener("change", remeasure);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", remeasure);
      wide.removeEventListener("change", remeasure);
      reduce.removeEventListener("change", remeasure);
      reset();
    };
  }, [products]);

  return (
    <div ref={wrapper} className="relative">
      <div
        ref={box}
        className="flex items-center max-lg:overflow-x-auto max-lg:pb-4 max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden"
      >
        <div className="flex w-max gap-[clamp(1.5rem,3.9vw,3.875rem)] px-gutter max-lg:snap-x max-lg:snap-mandatory">
          {products.map((product, i) => (
            <div
              key={product.slug}
              ref={(el) => {
                items.current[i] = el;
              }}
              className="w-[clamp(17rem,26vw,23.5rem)] shrink-0 max-lg:snap-start lg:will-change-transform"
            >
              <ProductCard product={product} tone={tone} compact />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
