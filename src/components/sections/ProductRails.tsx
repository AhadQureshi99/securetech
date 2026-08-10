"use client";

import Link from "next/link";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ProductScroller } from "@/components/products/ProductScroller";
import { PRODUCTS, type Product } from "@/data/products";

/**
 * The catalogue, as pinned horizontal rails.
 *
 * This replaces the filterable grid. The grid's filter chips were the only
 * thing the rails give up, and the two rails below already split the catalogue
 * along the same line the chips did — every card still carries its category
 * label, so nothing is lost except a click.
 *
 * Two rails, not three. "Facial recognition" is only two products, and a
 * pinned viewport that travels barely a screen for two cards reads as a bug
 * rather than an effect; they ride the terminals rail instead, which is
 * honest — they are terminals, and the card says which kind.
 *
 * `ProductScroller` does the actual work and is the same component the home
 * page uses, so the interaction is identical in both places by construction.
 */

const RAILS: { id: string; index: string; title: string; lede: string; products: readonly Product[] }[] = [
  {
    id: "terminals",
    index: "01",
    title: "The TPS family",
    lede: "Handheld fingerprint terminals and facial recognition units, designed and developed in-house — which is why the firmware, the capture standard and the integration can be shaped around your programme.",
    products: PRODUCTS.filter((p) => p.category !== "platforms"),
  },
  {
    id: "platforms",
    index: "02",
    title: "The platforms behind them",
    lede: "The middleware, the enrolment front ends and the device management that turn a terminal estate into a running programme — NADRA integration, CRM handshake, OTA updates and audit trail included.",
    products: PRODUCTS.filter((p) => p.category === "platforms"),
  },
];

export function ProductRails() {
  return (
    <section id="catalogue" className="scroll-mt-24 py-section">
      {RAILS.map((rail, i) => (
        // No `overflow-hidden` anywhere up this tree: an overflow ancestor
        // becomes the sticky containing block, and the rail would scroll away
        // instead of pinning. The frame inside `ProductScroller` clips.
        <div
          key={rail.id}
          id={rail.id}
          className={i > 0 ? "scroll-mt-24 pt-section" : "scroll-mt-24"}
        >
          <div className="container-page pb-[clamp(2.5rem,4vw,4rem)]">
            <div className="grid items-end gap-x-7 gap-y-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Reveal className="mb-[clamp(1rem,1.8vw,1.5rem)]">
                  <Eyebrow index={rail.index}>
                    {rail.products.length} products
                  </Eyebrow>
                </Reveal>
                <SplitReveal as="h2" className="text-display-lg text-ink-900">
                  {rail.title}
                </SplitReveal>
              </div>
              <div className="lg:col-span-4 lg:col-start-9 lg:pb-1.5">
                <Reveal delay={0.12}>
                  <p className="lede text-ink-600">{rail.lede}</p>
                </Reveal>
              </div>
            </div>
          </div>

          <ProductScroller products={rail.products} tone="light" />
        </div>
      ))}

      <div className="container-page pt-[clamp(2.5rem,4vw,4rem)]">
        <Reveal>
          <p className="border-t border-[var(--hairline)] pt-6 text-[0.8125rem] text-ink-500">
            Brochures open as PDFs. For specifications, firmware options or a
            configuration quote,{" "}
            <Link
              href="/contact"
              className="text-brand-500 hover:underline hover:underline-offset-4"
            >
              speak to the team
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
