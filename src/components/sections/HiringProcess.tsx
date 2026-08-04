"use client";

import { useRef } from "react";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { HIRING_STEPS } from "@/data/company";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { GSAP_EASE, STAGGER } from "@/lib/motion";

/**
 * The four hiring stages, joined by a rule that draws itself as you scroll.
 *
 * The rule is scrubbed rather than played: tying its progress to scroll
 * position is what makes the section feel like it is responding to the reader
 * instead of performing at them. The steps themselves still play on their own
 * trigger, because scrubbed opacity on text reads as flicker when someone
 * scrolls quickly.
 */
export function HiringProcess() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      const steps = gsap.utils.toArray<HTMLElement>("[data-step]", root);
      const rule = root.querySelector<HTMLElement>("[data-rule]");
      if (steps.length === 0) return;

      gsap.fromTo(
        steps,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: GSAP_EASE.out,
          stagger: STAGGER.card,
          scrollTrigger: { trigger: steps[0], start: "top 85%", once: true },
        },
      );

      if (rule) {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 70%",
              end: "bottom 75%",
              scrub: 0.6,
            },
          },
        );
      }
    },
    { scope },
  );

  return (
    <section ref={scope} className="bg-ink-50 py-section">
      <div className="container-page">
        <div className="mb-[clamp(2.5rem,4.5vw,4rem)] max-w-[46ch]">
          <Reveal>
            <Eyebrow index="03">Process</Eyebrow>
          </Reveal>
          <SplitReveal
            as="h2"
            className="my-[clamp(1rem,1.8vw,1.5rem)] text-display-lg text-ink-900"
          >
            How hiring works.
          </SplitReveal>
          <Reveal delay={0.1}>
            <p className="lede text-ink-600">
              Four stages, no aptitude tests and no unpaid take-homes. The whole
              process is normally finished inside four weeks.
            </p>
          </Reveal>
        </div>

        <div className="relative">
          {/* Scrubbed connector, desktop only — vertical stacking on mobile
              makes a horizontal rule meaningless. */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 hidden h-px bg-[var(--hairline)] lg:block"
          />
          <span
            data-rule
            aria-hidden
            className="absolute inset-x-0 top-0 hidden h-px origin-left scale-x-0 bg-brand-500 lg:block"
          />

          <ol className="grid gap-x-7 gap-y-px lg:grid-cols-4">
            {HIRING_STEPS.map((step) => (
              <li
                key={step.index}
                data-step
                className="border-t border-[var(--hairline)] pt-[clamp(1.5rem,2.4vw,2.125rem)] pb-[clamp(1.25rem,2vw,1.75rem)] lg:border-t-0"
              >
                <p className="tnum mb-4 font-mono text-label uppercase tracking-[0.13em] text-brand-500">
                  {step.index}
                </p>
                <h3 className="mb-2.5 text-[clamp(1.125rem,1.6vw,1.4375rem)] font-medium leading-[1.25] tracking-[-0.02em] text-ink-900">
                  {step.title}
                </h3>
                <p className="max-w-[38ch] text-sm leading-[1.7] text-ink-600">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
