"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { ArrowButton } from "@/components/brand/ArrowButton";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SERVICES } from "@/data/services";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { DUR, GSAP_EASE, SHIFT, STAGGER } from "@/lib/motion";

/**
 * What we do — now the card surface of the page.
 *
 * The hairline-row list this replaced was correct but inert. Cards give each
 * practice its own object to hover, which is what the brief asked for, and
 * they hold the 2×2 rhythm better than four stacked rows.
 *
 * Hover is three cheap, composited changes at once — a 3px lift, the border
 * warming to brand, and a wash fading up from the bottom edge. No scale, no
 * shadow bloom, nothing that moves the text.
 */
export function Services() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]", root);

      gsap.fromTo(
        cards,
        { opacity: 0, y: SHIFT.lg },
        {
          opacity: 1,
          y: 0,
          duration: DUR.reveal,
          ease: GSAP_EASE.out,
          stagger: STAGGER.card,
          scrollTrigger: { trigger: cards[0], start: "top 88%", once: true },
        },
      );
    },
    { scope },
  );

  return (
    <section ref={scope} id="capabilities" className="scroll-mt-24 bg-ink-50 py-section">
      <div className="container-page">
        <SectionHeading
          index="01"
          eyebrow="Capabilities"
          title="What we do"
          lede="Four practices, one delivery team. We take identity programmes from specification to deployed terminals — and we own every layer in between."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.index}
                data-service-card
                className="group relative isolate flex flex-col overflow-hidden rounded-lg border border-[var(--hairline)] bg-white p-[clamp(1.5rem,2.4vw,2.25rem)] transition-[transform,border-color] duration-400 ease-[var(--ease-expo)] hover:-translate-y-[3px] hover:border-brand-200"
              >
                {/* Wash rises from the bottom edge on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-brand-50 to-transparent opacity-0 transition-opacity duration-400 ease-[var(--ease-expo)] group-hover:opacity-100"
                />

                <div className="mb-6 flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-md border border-[var(--hairline-strong)] bg-white text-brand-500 transition-colors duration-400 group-hover:border-brand-300 group-hover:bg-brand-50">
                    <Icon className="size-5.5" strokeWidth={1.4} />
                  </span>
                  <span className="tnum font-mono text-label tracking-[0.12em] text-ink-500">
                    {service.index}
                  </span>
                </div>

                <h3 className="mb-3 text-display-sm text-ink-900">{service.title}</h3>

                <p className="mb-6 max-w-[46ch] flex-1 text-sm text-ink-600">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-x-2 gap-y-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="whitespace-nowrap rounded-full border border-[var(--hairline)] bg-white px-2.5 py-0.5 font-mono text-[0.6875rem] tracking-[0.04em] text-ink-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="mt-6 inline-flex items-center gap-2 border-t border-[var(--hairline)] pt-5 text-sm font-medium text-brand-500">
                  Discuss this capability
                  <ArrowUpRight className="size-3.5 transition-transform duration-400 ease-[var(--ease-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>

                {/* Whole card is the target; the link text above is the label. */}
                <Link
                  href="/contact"
                  className="absolute inset-0"
                  aria-label={`Discuss ${service.title}`}
                />
              </article>
            );
          })}
        </div>

        <Reveal className="mt-10">
          <ArrowButton href="/products" variant="ghost" size="sm">
            View the catalogue
          </ArrowButton>
        </Reveal>
      </div>
    </section>
  );
}
