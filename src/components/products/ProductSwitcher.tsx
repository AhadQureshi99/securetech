"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Download } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowButton } from "@/components/brand/ArrowButton";
import { ProductCard } from "@/components/cards/ProductCard";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import type { Product } from "@/data/products";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Pinned product switcher.
 *
 * The section holds the viewport and the *product* changes as you scroll —
 * one device on screen at a time, its copy on the left and the render on the
 * right, swapping in the scroll direction. This is the interaction in the
 * reference video, and it replaces the horizontal card rail that used to sit
 * here: a rail asks you to read six cards at once, this asks you to read one.
 *
 * Mechanism, deliberately the same shape as `ProductScroller` so the two are
 * maintained the same way:
 *
 *   1. A tall runway sets how long the section lasts — one `SEGMENT` of
 *      viewport height per product.
 *   2. A `sticky top-0 h-screen` frame inside it.
 *   3. Scroll progress through the runway maps to an index. Nothing else is
 *      scroll-driven; the swap itself is a normal enter/exit transition, which
 *      is what keeps it smooth on a trackpad that delivers progress in lumps.
 *
 * Direction matters: scrolling down brings the next device in from the right,
 * scrolling back brings the previous one in from the left, so the motion
 * always agrees with the gesture.
 *
 * Below 1024px, and under reduced motion, there is no pin at all — the section
 * degrades to the native swipe strip of cards underneath.
 */

/** Viewport heights of scroll spent on each product. */
const SEGMENT = 0.8;

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const devicePanel: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 90, scale: 0.88 }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.75, ease: EASE.expo },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -90,
    scale: 0.88,
    transition: { duration: 0.45, ease: EASE.expo },
  }),
};

const copyPanel: Variants = {
  enter: (dir: number) => ({ opacity: 0, y: dir * 26 }),
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE.expo, staggerChildren: 0.045 },
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir * -26,
    transition: { duration: 0.35, ease: EASE.expo },
  }),
};

export function ProductSwitcher({ products }: { products: readonly Product[] }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const direction = useRef(1);

  const [pinned, setPinned] = useState(false);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const lenis = useLenis();
  const count = products.length;

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setPinned(wide.matches && !reduce.matches);
    sync();

    wide.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const el = wrapper.current;
    if (!el || !pinned) {
      setIndex(0);
      setProgress(0);
      return;
    }

    let queued = false;

    const read = () => {
      queued = false;
      const max = el.offsetHeight - window.innerHeight;
      if (max <= 0) return;

      const passed = clamp(-el.getBoundingClientRect().top, 0, max);
      const p = passed / max;
      setProgress(p);

      // `min` rather than a clamp on the multiplication: at p === 1 the floor
      // lands one past the last product, and that frame would otherwise render
      // nothing.
      const next = Math.min(count - 1, Math.floor(p * count));
      setIndex((prev) => {
        if (next !== prev) direction.current = next > prev ? 1 : -1;
        return next;
      });
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned, count]);

  /** Centre of product `i`'s segment, in absolute document coordinates. */
  function jump(i: number) {
    const el = wrapper.current;
    if (!el) return;
    const max = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const y = top + max * ((i + 0.5) / count);

    if (lenis) lenis.scrollTo(y, { duration: 1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  }

  const active = products[index] ?? products[0];
  const dir = direction.current;

  return (
    <>
      {/* --------------------------------------------------- Pinned switcher */}
      <div
        ref={wrapper}
        className={cn("relative", !pinned && "hidden")}
        style={pinned ? { height: `calc(100vh + ${count * SEGMENT * 100}vh)` } : undefined}
        aria-hidden={!pinned}
      >
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden pb-[clamp(1.5rem,3vw,2.5rem)] pt-[calc(var(--nav-h)+clamp(1rem,2vw,2rem))]">
          <div className="container-page flex min-h-0 flex-1 flex-col">
            <div className="grid min-h-0 flex-1 items-center gap-x-8 lg:grid-cols-12">
              {/* Copy */}
              <div className="relative h-full lg:col-span-5">
                <AnimatePresence initial={false} custom={dir}>
                  <motion.div
                    key={active.slug}
                    custom={dir}
                    variants={copyPanel}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <p className="label mb-6 text-brand-300">
                      <span className="tnum text-white/45">
                        {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                      </span>
                      <span className="label-rule" />
                      <span>{active.categoryLabel}</span>
                    </p>

                    <h3 className="mb-5 text-display-2xl text-white">{active.name}</h3>

                    <p className="lede mb-6 max-w-[42ch] text-white/66">
                      {active.tagline ?? active.description}
                    </p>

                    <p className="mb-8 font-mono text-label uppercase tracking-[0.13em] text-white/55">
                      {active.spec}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <ArrowButton href="/contact" variant="invert" size="sm">
                        Request a demo
                      </ArrowButton>
                      {active.brochure ? (
                        <ArrowButton
                          href={active.brochure}
                          variant="outlineInvert"
                          size="sm"
                          external
                          icon={<Download className="size-3.5" strokeWidth={1.6} />}
                        >
                          Brochure
                        </ArrowButton>
                      ) : null}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Device */}
              <div className="relative h-full lg:col-span-6 lg:col-start-7">
                {/* The glow stays put while devices pass through it — it is the
                    lit stage, not part of any one product. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(46%_46%_at_50%_50%,rgba(19,108,179,0.42),transparent_70%)]"
                />
                <AnimatePresence initial={false} custom={dir}>
                  <motion.div
                    key={active.slug}
                    custom={dir}
                    variants={devicePanel}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 grid place-items-center p-[clamp(1rem,3vw,3rem)]"
                  >
                    <Image
                      src={active.image}
                      alt={active.name}
                      width={active.width}
                      height={active.height}
                      sizes="(max-width: 1024px) 90vw, 46vw"
                      priority={index === 0}
                      className={cn(
                        "max-h-full max-w-full",
                        active.photo
                          ? "rounded-md object-cover"
                          : "object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.45)]",
                      )}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Index row */}
            <div className="mt-[clamp(1rem,2vw,2rem)] shrink-0">
              <div className="relative mb-4 h-px w-full bg-white/12">
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 bg-brand-400"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <div className="flex flex-wrap items-center gap-x-[clamp(1rem,2.4vw,2.25rem)] gap-y-2">
                {products.map((product, i) => (
                  <button
                    key={product.slug}
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={i === index ? "true" : undefined}
                    className={cn(
                      "font-mono text-label uppercase tracking-[0.13em] transition-colors duration-400 ease-[var(--ease-expo)]",
                      i === index
                        ? "text-white"
                        : "text-white/38 hover:text-white/75",
                    )}
                  >
                    {product.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------- Fallback: no pin */}
      {/* Narrow viewports and reduced motion get the same six products as a
          native swipe strip. Pinning six screens on a phone is a trap — you
          cannot leave the section without scrolling all of it. */}
      <div className={cn(pinned && "hidden")}>
        <div className="flex snap-x snap-mandatory overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-5 px-gutter">
            {products.map((product) => (
              <div key={product.slug} className="w-[clamp(17rem,72vw,23.5rem)] shrink-0 snap-start">
                <ProductCard product={product} tone="dark" compact />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
