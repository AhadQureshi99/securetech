"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Pip } from "@/components/brand/Pip";
import type { Product } from "@/data/products";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Cinematic product sequence.
 *
 * The section pins and one master timeline is scrubbed against scroll. Each
 * product flies in from deep space, holds focus, then passes the camera and
 * exits behind it — so the sequence reads as objects moving through a room
 * rather than cards scrolling up a page.
 *
 * Construction notes that matter:
 *
 * - ONE timeline, not one ScrollTrigger per product. Overlapping segments on
 *   a single scrubbed timeline is what lets the outgoing product still be
 *   leaving while the next is already arriving; separate triggers would make
 *   each transition start from a dead stop.
 * - Transforms are split across nested layers so nothing fights for the same
 *   matrix: the stage does the camera drift, the slide does the scroll-driven
 *   flight, and the innermost layer does the Framer pointer tilt.
 * - `z` (translateZ) does the depth work rather than `scale`, so perspective
 *   foreshortening is real and the object grows the way something approaching
 *   the lens actually would.
 * - Copy travels a shorter distance than its device. That differential is
 *   what produces parallax depth between the text and the object.
 * - Only transform and opacity animate, everything is `force3D`, and
 *   `will-change` is scoped to the slides — no layout is read or written
 *   during scroll, so the whole sequence stays on the compositor.
 *
 * Below `lg`, and under reduced-motion, the pin is dropped entirely and the
 * products render as an honest stacked list.
 */

/** Scroll length per product, as a fraction of viewport height. */
const SCROLL_PER_PRODUCT = 1.15;

export function ProductCinema({ products }: { products: readonly Product[] }) {
  const scope = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLSpanElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const pinEl = pin.current;
          const stageEl = stage.current;
          if (!pinEl || !stageEl) return;

          const slides = gsap.utils.toArray<HTMLElement>("[data-slide]", root);
          const visuals = slides.map((s) =>
            s.querySelector<HTMLElement>("[data-slide-visual]"),
          );
          const copies = slides.map((s) =>
            s.querySelector<HTMLElement>("[data-slide-copy]"),
          );
          const shadows = slides.map((s) =>
            s.querySelector<HTMLElement>("[data-slide-shadow]"),
          );

          const total = slides.length * SCROLL_PER_PRODUCT;

          const tl = gsap.timeline({
            defaults: { force3D: true },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: () => `+=${window.innerHeight * total}`,
              pin: pinEl,
              pinType: "transform",
              anticipatePin: 1,
              scrub: 1.1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (progress.current) {
                  gsap.set(progress.current, { scaleX: self.progress });
                }
              },
            },
          });

          // Camera drift across the whole sequence — a few degrees, enough to
          // register as a moving viewpoint, not enough to notice as rotation.
          tl.fromTo(
            stageEl,
            { rotateY: 4, rotateX: -1.5 },
            { rotateY: -4, rotateX: 1.5, ease: "none", duration: total },
            0,
          );

          slides.forEach((slide, i) => {
            const at = i * SCROLL_PER_PRODUCT;
            const visual = visuals[i];
            const copy = copies[i];
            const shadow = shadows[i];
            const isLast = i === slides.length - 1;

            gsap.set(slide, { zIndex: i + 1 });

            // ── Arrive: out of depth, settling into focus.
            if (visual) {
              tl.fromTo(
                visual,
                {
                  z: -900,
                  yPercent: 16,
                  rotateY: -26,
                  rotateX: 11,
                  opacity: 0,
                },
                {
                  z: 0,
                  yPercent: 0,
                  rotateY: 0,
                  rotateX: 0,
                  opacity: 1,
                  ease: "power2.out",
                  duration: SCROLL_PER_PRODUCT * 0.78,
                },
                at,
              );
            }

            if (shadow) {
              tl.fromTo(
                shadow,
                { opacity: 0, scaleX: 0.5 },
                {
                  opacity: 1,
                  scaleX: 1,
                  ease: "power2.out",
                  duration: SCROLL_PER_PRODUCT * 0.78,
                },
                at,
              );
            }

            // Copy trails the object slightly and travels less far.
            if (copy) {
              tl.fromTo(
                copy,
                { opacity: 0, y: 46 },
                {
                  opacity: 1,
                  y: 0,
                  ease: "power3.out",
                  duration: SCROLL_PER_PRODUCT * 0.5,
                },
                at + SCROLL_PER_PRODUCT * 0.16,
              );
            }

            // Light pools on whichever product currently holds focus.
            if (glow.current) {
              tl.to(
                glow.current,
                { opacity: 0.85, ease: "power1.out", duration: SCROLL_PER_PRODUCT * 0.4 },
                at,
              );
            }

            // ── Depart: past the lens and out of frame behind the camera.
            if (!isLast) {
              const exit = at + SCROLL_PER_PRODUCT * 0.86;

              if (visual) {
                tl.to(
                  visual,
                  {
                    z: 620,
                    yPercent: -14,
                    rotateY: 18,
                    rotateX: -7,
                    opacity: 0,
                    ease: "power2.in",
                    duration: SCROLL_PER_PRODUCT * 0.62,
                  },
                  exit,
                );
              }
              if (shadow) {
                tl.to(
                  shadow,
                  { opacity: 0, scaleX: 1.4, ease: "power2.in", duration: SCROLL_PER_PRODUCT * 0.5 },
                  exit,
                );
              }
              if (copy) {
                tl.to(
                  copy,
                  { opacity: 0, y: -34, ease: "power2.in", duration: SCROLL_PER_PRODUCT * 0.42 },
                  exit,
                );
              }
              if (glow.current) {
                tl.to(
                  glow.current,
                  { opacity: 0.35, ease: "power1.in", duration: SCROLL_PER_PRODUCT * 0.4 },
                  exit,
                );
              }
            }
          });

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
            gsap.set([...slides, stageEl], { clearProps: "transform,opacity,zIndex" });
          };
        },
      );

      // Stacked fallback: no pin, no flight — just a restrained entrance.
      mm.add("(max-width: 1023px)", () => {
        const slides = gsap.utils.toArray<HTMLElement>("[data-slide]", root);
        if (prefersReducedMotion()) {
          gsap.set(slides, { opacity: 1, clearProps: "transform" });
          return;
        }
        slides.forEach((slide) => {
          gsap.fromTo(
            slide,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "expo.out",
              scrollTrigger: { trigger: slide, start: "top 88%", once: true },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      aria-label="Featured products"
      className="relative lg:h-auto"
    >
      <div
        ref={pin}
        className="relative flex flex-col justify-center overflow-hidden lg:h-screen"
      >
        {/* Focus light. Sits behind everything and brightens on each arrival. */}
        <span
          ref={glow}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(19,108,179,0.30),transparent_68%)] opacity-35 blur-2xl lg:block"
        />

        <div
          ref={stage}
          className="container-page relative lg:[perspective:1600px] lg:[transform-style:preserve-3d]"
        >
          {/* Desktop: slides stack in one frame. Mobile: they flow. */}
          <div className="relative grid gap-16 lg:block lg:h-[30rem]">
            {products.map((product, i) => (
              <article
                key={product.slug}
                data-slide
                id={product.slug}
                className="scroll-mt-28 lg:absolute lg:inset-0 lg:[transform-style:preserve-3d]"
              >
                <div className="grid items-center gap-x-10 gap-y-8 lg:h-full lg:grid-cols-12">
                  {/* Copy */}
                  <div
                    data-slide-copy
                    className="order-2 lg:order-1 lg:col-span-5 lg:will-change-[transform,opacity]"
                  >
                    <p className="mb-5 flex items-center gap-3 font-mono text-label uppercase tracking-[0.14em] text-brand-300">
                      <span className="tnum text-white/45">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="block h-px w-8 bg-white/25" />
                      {product.categoryLabel}
                    </p>

                    <h3 className="mb-4 text-display-lg text-white">{product.name}</h3>

                    <p className="lede mb-7 max-w-[42ch] text-white/62">
                      {product.description}
                    </p>

                    <span className="inline-flex items-center gap-2 rounded-full border border-white/16 px-3.5 py-1.5 font-mono text-label uppercase tracking-[0.1em] text-white/70">
                      {product.verified ? <Pip /> : null}
                      {product.spec}
                    </span>
                  </div>

                  {/* Object */}
                  <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7 lg:h-full">
                    <TiltObject product={product} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Sequence progress */}
        <div className="container-page mt-10 hidden lg:block">
          <div className="h-px w-full bg-white/12">
            <span
              ref={progress}
              className="block h-px origin-left scale-x-0 bg-brand-400"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Innermost layer. Framer springs a small tilt toward the cursor; because it
 * lives beneath the GSAP-driven flight layer, the two never write to the same
 * transform matrix.
 */
function TiltObject({ product }: { product: Product }) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const cfg = { stiffness: 140, damping: 18, mass: 0.7 };
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), cfg);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), cfg);
  const sheenX = useTransform(rotateY, [-9, 9], ["-34%", "34%"]);
  const sheenOpacity = useTransform(rotateY, [-9, 0, 9], [0.2, 0.06, 0.2]);

  return (
    <div
      data-slide-visual
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      className="group relative grid h-full place-items-center [transform-style:preserve-3d] lg:will-change-[transform,opacity]"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative grid aspect-4/3 w-full max-w-[30rem] place-items-center [transform-style:preserve-3d]"
      >
        <div className="relative h-full w-full p-[10%]">
          <Image
            src={product.image}
            alt={product.name}
            width={1000}
            height={1000}
            sizes="(max-width: 1024px) 80vw, 34vw"
            className="h-full w-full object-contain drop-shadow-[0_36px_48px_rgba(4,10,19,0.6)]"
          />
          <motion.span
            aria-hidden
            style={{ x: sheenX, opacity: sheenOpacity }}
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_38%,white_50%,transparent_62%)] mix-blend-overlay"
          />
        </div>
      </motion.div>

      {/* Contact shadow, grounded below the object */}
      <span
        data-slide-shadow
        aria-hidden
        className="pointer-events-none absolute bottom-[6%] left-1/2 h-4 w-[42%] -translate-x-1/2 rounded-[50%] bg-ink-950/75 blur-xl"
      />
    </div>
  );
}
