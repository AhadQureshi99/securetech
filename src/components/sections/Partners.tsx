"use client";

import Image from "next/image";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ALL_CLIENTS } from "@/data/clients";
import { cn } from "@/lib/utils";

/**
 * Partners and customers, as a hairline grid of marks.
 *
 * Distinct on purpose from `TrustMarquee` on the home page: a moving rail is a
 * glance, this is a list you can actually read. The cells are a `gap-px` grid
 * over a hairline fill, which is what gives the ruled-sheet look without
 * twenty individual borders doubling up at every join.
 *
 * Greyscale at rest, colour on hover — twenty logo treatments at full
 * saturation would fight the palette, and every one of them is a different
 * vintage.
 *
 * Copy is a prop because this runs on more than one page and the reason a
 * visitor is looking at it differs: on About it is the delivery record, on
 * Careers it is who you would be building for.
 */
export function Partners({
  index,
  eyebrow = "Partners & customers",
  title,
  lede,
  tone = "light",
  className,
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  lede: string;
  tone?: "light" | "ink50";
  className?: string;
}) {
  return (
    <section
      className={cn("py-section", tone === "ink50" && "bg-ink-50", className)}
    >
      <div className="container-page">
        <div className="mb-[clamp(2.5rem,4vw,3.5rem)] grid items-end gap-x-7 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal className="mb-[clamp(1rem,1.8vw,1.5rem)]">
              <Eyebrow index={index}>{eyebrow}</Eyebrow>
            </Reveal>
            <SplitReveal as="h2" className="text-display-lg text-ink-900">
              {title}
            </SplitReveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pb-1.5">
            <Reveal delay={0.12}>
              <p className="lede text-ink-600">{lede}</p>
            </Reveal>
          </div>
        </div>

        <Reveal
          stagger={0.03}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-[var(--hairline)] sm:grid-cols-3 lg:grid-cols-5"
        >
          {ALL_CLIENTS.map((client) => (
            <div
              key={client.src}
              title={client.name}
              className="group grid aspect-[3/2] place-items-center bg-white p-5 transition-colors duration-400 ease-[var(--ease-expo)] hover:bg-ink-50"
            >
              <Image
                src={client.src}
                alt={client.name}
                width={client.width}
                height={client.height}
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                className="max-h-[clamp(2rem,3.4vw,2.75rem)] w-auto max-w-full object-contain opacity-55 grayscale transition duration-400 ease-[var(--ease-expo)] group-hover:opacity-100 group-hover:grayscale-0"
              />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
