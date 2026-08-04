"use client";

import { ArrowButton } from "@/components/brand/ArrowButton";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { RidgeMotif } from "@/components/brand/RidgeMotif";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { SITE } from "@/data/site";

type CTAProps = {
  eyebrow?: string;
  title: string;
  body: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  showDirect?: boolean;
};

/**
 * The closing beat. The one deep-blue surface on the site — used sparingly so
 * arriving at it registers as a change of gear rather than more brand colour.
 */
export function CTA({
  eyebrow = "Next step",
  title,
  body,
  primary = { label: "Talk to Our Team", href: "/contact" },
  secondary,
  showDirect = false,
}: CTAProps) {
  return (
    /* Deep navy, not brand blue. A mid-blue panel made this read as a banner
       ad; at near-black the section registers as a change of gear and the
       white type gets the contrast it needs. */
    <section className="surface-navy relative overflow-hidden py-section text-white">
      <Parallax
        amount={6}
        className="pointer-events-none absolute right-[-8%] top-1/2 w-[min(46rem,62%)] -translate-y-1/2"
      >
        <RidgeMotif variant="invert" opacity={0.16} />
      </Parallax>
      <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.04]" />

      <div className="container-page relative">
        <div className="max-w-[44rem]">
          <Reveal>
            <Eyebrow tone="onBrand">{eyebrow}</Eyebrow>
          </Reveal>

          <SplitReveal
            as="h2"
            className="my-[clamp(1.25rem,2vw,1.75rem)] text-display-lg text-white"
          >
            {title}
          </SplitReveal>

          <Reveal delay={0.1}>
            <p className="lede text-white/78">{body}</p>
          </Reveal>

          <Reveal delay={0.18} className="mt-8 flex flex-wrap items-center gap-3">
            <ArrowButton href={primary.href} variant="invert">
              {primary.label}
            </ArrowButton>
            {secondary ? (
              <ArrowButton href={secondary.href} variant="outlineInvert">
                {secondary.label}
              </ArrowButton>
            ) : null}
          </Reveal>

          {showDirect ? (
            <Reveal delay={0.24}>
              <dl className="mt-[clamp(2rem,3.4vw,3rem)] flex flex-wrap gap-x-[clamp(1.5rem,3vw,2.75rem)] gap-y-2 border-t border-white/22 pt-[clamp(1.5rem,2.4vw,2rem)]">
                <div className="grid gap-1">
                  <dt className="font-mono text-label uppercase tracking-[0.13em] text-white/78">
                    Telephone
                  </dt>
                  <dd className="text-sm font-medium">
                    <a href={SITE.switchboardHref} className="hover:underline hover:underline-offset-4">
                      {SITE.switchboard}
                    </a>
                  </dd>
                </div>
                <div className="grid gap-1">
                  <dt className="font-mono text-label uppercase tracking-[0.13em] text-white/78">
                    Email
                  </dt>
                  <dd className="text-sm font-medium">
                    <a href={`mailto:${SITE.email}`} className="hover:underline hover:underline-offset-4">
                      {SITE.email}
                    </a>
                  </dd>
                </div>
                <div className="grid gap-1">
                  <dt className="font-mono text-label uppercase tracking-[0.13em] text-white/78">
                    Head office
                  </dt>
                  <dd className="text-sm font-medium">{SITE.headOffice.short}</dd>
                </div>
              </dl>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
