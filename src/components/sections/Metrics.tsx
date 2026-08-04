"use client";

import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";

export function Metrics({
  items,
}: {
  items: readonly { value: number; label: string; suffix?: string }[];
}) {
  return (
    <section className="pb-section-sm">
      <div className="container-page">
        <Reveal
          stagger={0.1}
          className="grid overflow-hidden rounded-lg border border-[var(--hairline)] bg-white sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item) => (
            <div
              key={item.label}
              className="border-[var(--hairline)] p-[clamp(1.25rem,2.4vw,2rem)] not-last:border-b sm:not-last:border-b-0 sm:[&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0 sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r lg:[&:not(:last-child)]:border-r"
            >
              <p className="tnum mb-2.5 text-[clamp(1.625rem,2.8vw,2.5rem)] font-medium leading-none tracking-[-0.035em] text-ink-900">
                <Counter to={item.value} suffix={item.suffix ?? ""} />
              </p>
              <p className="font-mono text-label uppercase leading-[1.5] tracking-[0.13em] text-ink-500">
                {item.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
