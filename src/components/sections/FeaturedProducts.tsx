"use client";

import Link from "next/link";
import { ArrowButton } from "@/components/brand/ArrowButton";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { ProductCinema } from "@/components/products/ProductCinema";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FEATURED_PRODUCTS, PLATFORM_LINKS } from "@/data/products";

/**
 * Featured products.
 *
 * The heading and the catalogue strip bookend a pinned, scroll-scrubbed
 * sequence (`ProductCinema`) in which each device flies out of depth, holds
 * focus, and passes the camera as the next arrives.
 *
 * This is the one place on the site where motion is the point. Everywhere
 * else stays deliberately restrained — the contrast is what makes this
 * section land instead of blending into a page that is already busy.
 */
export function FeaturedProducts() {
  return (
    <div className="surface-navy relative overflow-hidden text-white">
      <div
        aria-hidden
        className="dot-matrix pointer-events-none absolute inset-0 text-white opacity-[0.06]"
      />

      {/* Heading */}
      <div className="container-page relative pt-section pb-[clamp(2.5rem,4vw,4rem)]">
        <div className="grid items-end gap-x-8 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal className="mb-5">
              <Eyebrow index="02" tone="invert">
                Products
              </Eyebrow>
            </Reveal>
            <SplitReveal as="h2" className="text-display-lg text-white">
              Engineered, not rebadged.
            </SplitReveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pb-1">
            <Reveal delay={0.1}>
              <p className="lede text-white/62">
                Every terminal in the TPS family is designed and developed
                in-house — which is why we can change the device to fit your
                programme, rather than the other way round.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* The sequence */}
      <ProductCinema products={FEATURED_PRODUCTS} />

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
                  href={`/products#${platform.slug}`}
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
