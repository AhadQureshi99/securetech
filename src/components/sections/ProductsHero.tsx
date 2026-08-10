"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowButton } from "@/components/brand/ArrowButton";
import { Pip } from "@/components/brand/Pip";
import { RidgeMotif } from "@/components/brand/RidgeMotif";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { HERO_DEVICE, PRODUCTS } from "@/data/products";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { DUR, GSAP_EASE, STAGGER } from "@/lib/motion";

/**
 * Products opener.
 *
 * This is the device-on-a-ridge treatment the home page used to carry. It was
 * taken off the home page because a floating terminal reads as product
 * marketing rather than consultancy — which is exactly right here, on the page
 * whose entire subject is the hardware.
 *
 * Only the *composition* moved. The headline is the Products page's own copy,
 * not the home page's; nothing about "Identity, verified at national scale"
 * belongs on a second page.
 *
 * Three things move on the right-hand side, all cheap:
 *   • the ridge rings draw outward and then rotate very slowly (`RidgeMotif`),
 *   • the device unclips, settles, and then floats on a long yoyo,
 *   • a single scan line sweeps the frame on the shared `scan` keyframe.
 *
 * Under reduced motion every one of them is skipped and the composition is
 * simply set to its resting state.
 */

const TERMINAL_COUNT = PRODUCTS.filter((p) => p.category !== "platforms").length;
const PLATFORM_COUNT = PRODUCTS.filter((p) => p.category === "platforms").length;

export function ProductsHero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const q = gsap.utils.selector(root);

      if (prefersReducedMotion()) {
        gsap.set(q("[data-anim='hidden']"), { opacity: 1, y: 0 });
        gsap.set(q("[data-hero='device']"), { opacity: 1, y: 0, scale: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: GSAP_EASE.out, duration: DUR.slow },
      });

      tl.to(q("[data-hero='crumb']"), { opacity: 1, y: 0 }, 0.05)
        .fromTo(
          q("[data-hero='device']"),
          { opacity: 0, y: 40, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: DUR.long },
          0.15,
        )
        .to(q("[data-hero='lede']"), { opacity: 1, y: 0 }, 0.42)
        .to(q("[data-hero='cta']"), { opacity: 1, y: 0 }, 0.52)
        .to(
          q("[data-hero='tag']"),
          { opacity: 1, y: 0, stagger: STAGGER.card },
          0.7,
        );

      // Long, shallow float — begins only once the entrance has landed, so the
      // two never fight over the same transform.
      const float = gsap.to(q("[data-hero='device']"), {
        y: -14,
        duration: 3.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.2,
      });

      return () => {
        tl.kill();
        float.kill();
      };
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className="relative overflow-hidden border-b border-[var(--hairline)] bg-gradient-to-b from-brand-50 to-white pb-[clamp(2.5rem,4vw,3.75rem)] pt-[calc(var(--nav-h)+clamp(2rem,3.5vw,3.25rem))]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(46rem_32rem_at_82%_-8%,var(--color-brand-100),transparent_70%)]"
      />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.03]" />

      <div className="container-page relative">
        <div className="grid items-center gap-x-8 gap-y-10 lg:grid-cols-12">
          {/* Copy */}
          <div className="lg:col-span-6">
            <div data-hero="crumb" data-anim="hidden" className="translate-y-2.5">
              <p className="mb-6 flex items-center gap-2 font-mono text-label uppercase tracking-[0.13em] text-ink-500">
                <Link href="/" className="transition-colors hover:text-brand-500">
                  Home
                </Link>
                <span aria-hidden>/</span>
                <span>Products</span>
              </p>
            </div>

            <SplitReveal
              as="h1"
              immediate
              delay={0.12}
              className="mb-6 max-w-[18ch] text-display-xl text-ink-900"
            >
              Fifteen products. One integration surface.
            </SplitReveal>

            <p
              data-hero="lede"
              data-anim="hidden"
              className="lede mb-8 max-w-[46ch] translate-y-2.5 text-ink-600"
            >
              The TPS terminal family and the platforms behind it are designed
              and developed in-house, so the device, the middleware and the
              database handshake are never three separate procurement problems.
            </p>

            <div
              data-hero="cta"
              data-anim="hidden"
              className="flex translate-y-2.5 flex-wrap items-center gap-3"
            >
              <ArrowButton href="#catalogue">Browse the catalogue</ArrowButton>
              <ArrowButton href="/contact" variant="ghost">
                Request a Specification
              </ArrowButton>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[var(--hairline)] pt-6">
              {[
                { value: TERMINAL_COUNT, label: "Handheld & facial terminals" },
                { value: PLATFORM_COUNT, label: "Software platforms" },
                { value: "In-house", label: "Hardware & firmware" },
              ].map((tag) => (
                <div key={tag.label} data-hero="tag" data-anim="hidden" className="translate-y-2.5">
                  <p className="tnum text-[clamp(1.25rem,1.9vw,1.625rem)] font-medium leading-none tracking-[-0.03em] text-ink-900">
                    {tag.value}
                  </p>
                  <p className="mt-1.5 font-mono text-label uppercase tracking-[0.13em] text-ink-500">
                    {tag.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Device on the ridge */}
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
              {/* Ridge, centred behind the device */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-[-14%] grid place-items-center"
              >
                <RidgeMotif draw spin opacity={0.68} />
              </div>

              {/* Scan sweep. Clipped to the frame so it reads as an instrument
                  pass over the device rather than a stray line on the page. */}
              <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Full-height element carrying a 1px line at its top edge, so
                    a 0→100% translate is exactly one pass of the frame at any
                    viewport width. */}
                <div className="absolute inset-x-[10%] top-0 h-full animate-[scan-frame_5.5s_var(--ease-io)_infinite] bg-[linear-gradient(to_right,transparent,var(--color-verify-500),transparent)] bg-[length:100%_1px] bg-top bg-no-repeat" />
              </div>

              <div
                data-hero="device"
                data-anim="hidden"
                className="absolute inset-0 grid place-items-center p-[12%]"
              >
                <Image
                  src={HERO_DEVICE.image}
                  alt={`${HERO_DEVICE.name} handheld biometric terminal`}
                  width={HERO_DEVICE.width}
                  height={HERO_DEVICE.height}
                  priority
                  sizes="(max-width: 1024px) 80vw, 34vw"
                  className="max-h-full w-full max-w-full object-contain drop-shadow-[0_36px_48px_rgba(8,17,30,0.22)]"
                />
              </div>

              {/* Annotations. Both are read off the product record rather than
                  written here, so they cannot drift from the catalogue. */}
              <div
                data-hero="tag"
                data-anim="hidden"
                className="absolute right-0 top-[6%] translate-y-2.5 text-right"
              >
                <p className="font-mono text-label uppercase tracking-[0.13em] text-ink-500">
                  {HERO_DEVICE.categoryLabel}
                </p>
                <p className="mt-1.5 inline-flex items-center gap-2 text-sm font-medium text-ink-900">
                  <Pip />
                  {HERO_DEVICE.name}
                </p>
              </div>

              <div
                data-hero="tag"
                data-anim="hidden"
                className="absolute bottom-[6%] left-0 translate-y-2.5"
              >
                <p className="font-mono text-label uppercase tracking-[0.13em] text-ink-500">
                  {HERO_DEVICE.spec}
                </p>
                <p className="mt-1.5 text-sm font-medium text-ink-900">
                  Designed &amp; built in Islamabad
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
