"use client";

import { Award, BadgeCheck } from "lucide-react";
import { useRef } from "react";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { AWARDS, CERTIFICATIONS } from "@/data/site";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { GSAP_EASE, STAGGER } from "@/lib/motion";

/**
 * Accreditations and awards.
 *
 * The certifications sit in the sticky rail because they are the load-bearing
 * claim — a reader who skims the award list still has SAS-UP and ISO 27001 in
 * view the whole time.
 */
export function Recognition() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      const rows = gsap.utils.toArray<HTMLElement>("[data-award]", root);
      if (rows.length === 0) return;

      gsap.fromTo(
        rows,
        { opacity: 0, y: 26 },
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
    <section ref={scope} className="py-section">
      <div className="container-page">
        <div className="grid gap-x-7 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4 lg:self-start xl:sticky xl:top-[calc(var(--nav-h)+2.5rem)]">
            <Reveal>
              <Eyebrow index="03">Recognition</Eyebrow>
            </Reveal>
            <SplitReveal
              as="h2"
              className="my-[clamp(1rem,1.8vw,1.5rem)] text-display-lg text-ink-900"
            >
              Accolades we did not ask for.
            </SplitReveal>
            <Reveal delay={0.1}>
              <p className="lede mb-7 text-ink-600">
                Awards follow delivered programmes. The accreditations below are
                the ones auditors actually check.
              </p>

              <ul className="grid gap-3">
                {CERTIFICATIONS.map((cert) => (
                  <li
                    key={cert.title}
                    className="flex items-start gap-3 rounded-md border border-[var(--hairline)] bg-white p-4"
                  >
                    <BadgeCheck
                      className="mt-0.5 size-4.5 shrink-0 text-verify-500"
                      strokeWidth={1.6}
                    />
                    <div>
                      <strong className="block text-sm font-semibold text-ink-900">
                        {cert.title}
                      </strong>
                      <span className="text-[0.8125rem] leading-[1.6] text-ink-500">
                        {cert.detail}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <ul className="lg:col-span-7 lg:col-start-6">
            {AWARDS.map((award, i) => (
              <li
                key={award}
                data-award
                className="group grid grid-cols-[auto_1fr] items-start gap-x-[clamp(1rem,2vw,2rem)] border-t border-[var(--hairline)] py-[clamp(1.25rem,2.2vw,1.875rem)] last:border-b"
              >
                <span className="grid size-9 place-items-center rounded-sm border border-[var(--hairline-strong)] bg-white text-brand-500 transition-colors duration-400 ease-[var(--ease-expo)] group-hover:border-brand-300 group-hover:bg-brand-50">
                  <Award className="size-4" strokeWidth={1.5} />
                </span>
                <div className="flex items-start justify-between gap-4">
                  <p className="max-w-[46ch] text-[clamp(0.9375rem,1.15vw,1.0625rem)] leading-[1.5] text-ink-800 transition-transform duration-400 ease-[var(--ease-expo)] group-hover:translate-x-1.5">
                    {award}
                  </p>
                  <span className="tnum hidden shrink-0 pt-1 font-mono text-label tracking-[0.12em] text-ink-500 sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
