import Link from "next/link";
import type { ReactNode } from "react";
import { RidgeMotif } from "@/components/brand/RidgeMotif";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";

/**
 * Shared page opener. Same ridge, same rhythm, same breadcrumb on every inner
 * page — consistency here is most of what makes a multi-page site feel like
 * one product rather than five templates.
 */
export function PageHeader({
  crumb,
  title,
  lede,
  children,
}: {
  crumb: string;
  title: ReactNode;
  lede: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--hairline)] bg-gradient-to-b from-brand-50 to-white pb-[clamp(2.5rem,4.5vw,4rem)] pt-[calc(var(--nav-h)+clamp(3rem,6vw,6rem))]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[30%] right-[-6%] w-[min(38rem,52%)] opacity-50"
      >
        <RidgeMotif spin />
      </div>
      <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.03]" />

      <div className="container-page relative">
        <Reveal immediate>
          <p className="flex items-center gap-2 font-mono text-label uppercase tracking-[0.13em] text-ink-500">
            <Link href="/" className="transition-colors hover:text-brand-500">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span>{crumb}</span>
          </p>
        </Reveal>

        <SplitReveal
          as="h1"
          immediate
          delay={0.15}
          className="my-[clamp(1rem,1.8vw,1.5rem)] max-w-[22ch] text-display-lg text-ink-900"
        >
          {title}
        </SplitReveal>

        <Reveal immediate delay={0.45}>
          <p className="lede max-w-[44ch] text-ink-600">{lede}</p>
        </Reveal>

        {children}
      </div>
    </section>
  );
}
