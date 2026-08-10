"use client";

import { Award } from "lucide-react";
import { useRef } from "react";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { AWARDS } from "@/data/site";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { GSAP_EASE, STAGGER } from "@/lib/motion";

/**
 * Awards, on the About page.
 *
 * The same five awards appear in three places now, each doing a different job:
 * the home page lists them as supporting evidence inside "Why choose us", the
 * Company page pairs them with the accreditations auditors check, and here
 * they close the leadership section — the people, then what the work they
 * signed for was given.
 *
 * Rendered as a two-column ruled list rather than a third variant of the same
 * single-column stack, so the repetition does not read as a copy-paste.
 */
export function Awards() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      const rows = gsap.utils.toArray<HTMLElement>("[data-award-row]", root);
      if (rows.length === 0) return;

      gsap.fromTo(
        rows,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: GSAP_EASE.out,
          stagger: STAGGER.row,
          scrollTrigger: { trigger: rows[0], start: "top 88%", once: true },
        },
      );
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className="relative overflow-hidden border-y border-[var(--hairline)] bg-gradient-to-b from-brand-50 to-white py-section"
    >
      <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.03]" />

      <div className="container-page relative">
        <div className="mb-[clamp(2.5rem,4vw,3.5rem)] grid items-end gap-x-7 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal className="mb-[clamp(1rem,1.8vw,1.5rem)]">
              <Eyebrow index="05">Recognition</Eyebrow>
            </Reveal>
            <SplitReveal as="h2" className="text-display-lg text-ink-900">
              Accolades we did not ask for.
            </SplitReveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pb-1.5">
            <Reveal delay={0.12}>
              <p className="lede text-ink-600">
                Awards follow delivered programmes — every one of these was
                given for work already in the field.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="grid gap-x-8 border-t border-[var(--hairline)] md:grid-cols-2">
          {AWARDS.map((award, i) => (
            <li
              key={award}
              data-award-row
              className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-[clamp(0.875rem,1.6vw,1.5rem)] border-b border-[var(--hairline)] py-[clamp(1.125rem,2vw,1.625rem)]"
            >
              <span className="grid size-9 place-items-center rounded-sm border border-[var(--hairline-strong)] bg-white text-brand-500 transition-colors duration-400 ease-[var(--ease-expo)] group-hover:border-brand-300 group-hover:bg-brand-50">
                <Award className="size-4" strokeWidth={1.5} />
              </span>
              <p className="text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.5] text-ink-800 transition-transform duration-400 ease-[var(--ease-expo)] group-hover:translate-x-1.5">
                {award}
              </p>
              <span className="tnum hidden pt-1 font-mono text-label tracking-[0.12em] text-ink-500 sm:block">
                {String(i + 1).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
