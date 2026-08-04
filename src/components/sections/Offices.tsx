"use client";

import { MapPin, Phone } from "lucide-react";
import { useRef } from "react";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { OFFICES } from "@/data/company";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { GSAP_EASE, STAGGER } from "@/lib/motion";

/**
 * The seven-office grid.
 *
 * Cards rise on a single shared trigger keyed to the first card rather than
 * one trigger each — with a stagger this reads as one deliberate sweep across
 * the grid, whereas per-card triggers fire in whatever order the viewport
 * happens to cross them and the section arrives in pieces.
 */
export function Offices() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-office]", root);
      if (cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: GSAP_EASE.out,
          stagger: STAGGER.card,
          scrollTrigger: { trigger: cards[0], start: "top 88%", once: true },
        },
      );
    },
    { scope },
  );

  return (
    <section ref={scope} className="bg-ink-50 py-section">
      <div className="container-page">
        <div className="mb-[clamp(2.5rem,4.5vw,4rem)] max-w-[46ch]">
          <Reveal>
            <Eyebrow index="02">Presence</Eyebrow>
          </Reveal>
          <SplitReveal
            as="h2"
            className="my-[clamp(1rem,1.8vw,1.5rem)] text-display-lg text-ink-900"
          >
            Seven offices, one delivery team.
          </SplitReveal>
          <Reveal delay={0.1}>
            <p className="lede text-ink-600">
              Engineering and programme management run out of Islamabad.
              Regional offices exist so deployment, training and support happen
              where the terminals actually are.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-px overflow-hidden rounded-lg border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-3">
          {OFFICES.map((office) => (
            <article
              key={office.id}
              data-office
              className="group relative flex flex-col bg-white p-[clamp(1.25rem,2.2vw,1.875rem)] transition-colors duration-400 ease-[var(--ease-expo)] hover:bg-brand-50"
            >
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <h3 className="text-display-sm text-ink-900">{office.city}</h3>
                <span
                  className={
                    office.isHq
                      ? "rounded-full bg-verify-100 px-2.5 py-1 font-mono text-label uppercase tracking-[0.13em] text-verify-700"
                      : "rounded-full border border-[var(--hairline)] px-2.5 py-1 font-mono text-label uppercase tracking-[0.13em] text-ink-500"
                  }
                >
                  {office.tag}
                </span>
              </div>

              <p className="mb-4 font-mono text-label uppercase tracking-[0.13em] text-ink-500">
                {office.role}
              </p>

              <address className="mb-5 flex items-start gap-2.5 not-italic text-sm leading-[1.65] text-ink-600">
                <MapPin
                  className="mt-1 size-3.5 shrink-0 text-brand-500"
                  strokeWidth={1.6}
                />
                <span>
                  {office.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </address>

              <a
                href={office.phoneHref}
                className="mb-5 inline-flex items-center gap-2.5 text-sm text-ink-700 transition-colors duration-400 ease-[var(--ease-expo)] hover:text-brand-600"
              >
                <Phone className="size-3.5 shrink-0 text-brand-500" strokeWidth={1.6} />
                <span className="tnum font-mono">{office.phone}</span>
              </a>

              <p className="mt-auto border-t border-[var(--hairline)] pt-4 text-[0.8125rem] leading-[1.6] text-ink-500">
                {office.coverage}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
