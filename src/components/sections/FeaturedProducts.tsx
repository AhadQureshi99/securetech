"use client";

import Link from "next/link";
import { ArrowButton } from "@/components/brand/ArrowButton";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { ProductSwitcher } from "@/components/products/ProductSwitcher";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { PLATFORM_LINKS, SHOWCASE_PRODUCTS } from "@/data/products";

/**
 * Product Suite.
 *
 * Heading block, then a sticky horizontal rail (`ProductScroller`) that
 * reproduces the scroll interaction on cantor8.io's product section — cards
 * travelling right-to-left on a vertical stagger, scaling up as they reach
 * the focus line, with lerp-smoothed motion.
 *
 * The heading sits above the runway rather than inside the sticky frame, so
 * it scrolls away normally and leaves the full viewport to the rail while it
 * is pinned.
 */
export function FeaturedProducts() {
  return (
    // No `overflow-hidden` on this wrapper: an overflow ancestor becomes the
    // sticky containing block, and the rail's sticky frame would scroll away
    // instead of pinning. Horizontal clipping happens on the frame itself.
    <div className="surface-navy relative text-white">
      <div
        aria-hidden
        className="dot-matrix pointer-events-none absolute inset-0 text-white opacity-[0.06]"
      />

      {/* Heading */}
      <div className="container-page relative pt-section pb-[clamp(2.5rem,4vw,4rem)]">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal className="mb-5">
              <Eyebrow index="02" tone="invert">
                Products
              </Eyebrow>
            </Reveal>
            <SplitReveal as="h2" className="text-display-2xl text-white">
              Product Suite
            </SplitReveal>
          </div>

          <Reveal delay={0.15} className="shrink-0">
            <ArrowButton href="/products" variant="outlineInvert">
              Discover Products
            </ArrowButton>
          </Reveal>
        </div>

        <Reveal delay={0.05} className="mt-8">
          <p className="lede max-w-[46ch] text-white/62">
            Every terminal in the TPS family is designed and developed
            in-house — which is why we can change the device to fit your
            programme, rather than the other way round.
          </p>
        </Reveal>
      </div>

      {/* Pinned switcher — one product at a time, changing on scroll */}
      <ProductSwitcher products={SHOWCASE_PRODUCTS} />

      {/* Catalogue strip */}
      <div className="container-page relative pb-section pt-[clamp(2.5rem,4vw,4rem)]">
        <Reveal>
          <hr className="border-0 border-t border-white/13" />
          <div className="mt-7 flex flex-wrap items-start justify-between gap-5">
            <Eyebrow tone="invert">Also in the catalogue</Eyebrow>

            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
              {PLATFORM_LINKS.map((platform) => (
                <Link
                  key={platform.slug}
                  // The Products page renders the catalogue as pinned rails, so
                  // a per-card anchor inside a transformed track cannot be
                  // scrolled to reliably. These land on the platforms rail.
                  href="/products#platforms"
                  className="whitespace-nowrap rounded-full border border-white/18 px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.04em] text-white/72 transition-colors duration-300 hover:border-white/40 hover:bg-white/6 hover:text-white"
                >
                  {platform.label}
                </Link>
              ))}
              <ArrowButton href="/products" variant="outlineInvert" size="sm">
                All 15 products
              </ArrowButton>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
