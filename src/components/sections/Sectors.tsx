"use client";

import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SECTORS } from "@/data/services";

export function Sectors() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-section text-white">
      <div
        aria-hidden
        className="dot-matrix pointer-events-none absolute inset-0 text-white opacity-[0.12]"
      />
      <div className="container-page relative">
        <SectionHeading
          index="04"
          eyebrow="Sectors"
          title="Where our systems run."
          lede="Deep industry and technology expertise lets us deliver strategic IT solutions to complex problems across sectors."
          tone="dark"
        />

        <Reveal stagger={0.06}>
          {SECTORS.map((sector) => (
            <article
              key={sector.index}
              className="group relative isolate grid grid-cols-1 items-start gap-x-8 gap-y-2 border-t border-white/13 py-[clamp(1.25rem,2.2vw,1.875rem)] last:border-b sm:grid-cols-[1fr_auto]"
            >
              <span className="pointer-events-none absolute -inset-x-[calc(var(--spacing-gutter)*0.5)] inset-y-0 -z-10 bg-white/4 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div>
                <h3 className="mb-2 text-[clamp(1.125rem,1.6vw,1.4375rem)] font-medium tracking-[-0.02em] text-white transition-transform duration-400 ease-[var(--ease-expo)] group-hover:translate-x-1.5">
                  {sector.title}
                </h3>
                <p className="max-w-[62ch] text-sm text-white/66">{sector.body}</p>
              </div>
              <p className="tnum font-mono text-label tracking-[0.12em] text-white/45 sm:pt-2">
                {sector.index}
              </p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
