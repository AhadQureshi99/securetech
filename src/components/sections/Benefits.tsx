"use client";

import { Globe, Layers, MapPin, Plane, Shield, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef } from "react";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { BENEFITS } from "@/data/company";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { GSAP_EASE, STAGGER } from "@/lib/motion";

/** Data carries an icon name; the mapping to a component stays in the view. */
const ICONS: Record<string, LucideIcon> = {
  globe: Globe,
  layers: Layers,
  shield: Shield,
  users: Users,
  plane: Plane,
  pin: MapPin,
};

export function Benefits() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-benefit]", root);
      if (cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 32 },
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
    <section ref={scope} className="py-section">
      <div className="container-page">
        <div className="mb-[clamp(2.5rem,4.5vw,4rem)] max-w-[46ch]">
          <Reveal>
            <Eyebrow index="01">Why here</Eyebrow>
          </Reveal>
          <SplitReveal
            as="h2"
            className="my-[clamp(1rem,1.8vw,1.5rem)] text-display-lg text-ink-900"
          >
            Small team. Serious scope.
          </SplitReveal>
          <Reveal delay={0.1}>
            <p className="lede text-ink-600">
              The systems built here verify citizens, issue SIMs and secure
              elections. That raises the standard of the work — and the standard
              of the people you will work beside.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-x-7 gap-y-px sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit) => {
            const Icon = ICONS[benefit.icon] ?? Layers;
            return (
              <article
                key={benefit.title}
                data-benefit
                className="group border-t border-[var(--hairline)] py-[clamp(1.5rem,2.4vw,2.125rem)]"
              >
                <span className="mb-5 grid size-11 place-items-center rounded-sm border border-[var(--hairline-strong)] bg-white text-brand-500 transition-colors duration-400 ease-[var(--ease-expo)] group-hover:border-brand-300 group-hover:bg-brand-50">
                  <Icon className="size-5.5" strokeWidth={1.4} />
                </span>
                <h3 className="mb-2.5 text-[clamp(1.125rem,1.6vw,1.4375rem)] font-medium leading-[1.25] tracking-[-0.02em] text-ink-900 transition-transform duration-400 ease-[var(--ease-expo)] group-hover:translate-x-1.5">
                  {benefit.title}
                </h3>
                <p className="max-w-[42ch] text-sm leading-[1.7] text-ink-600">
                  {benefit.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
