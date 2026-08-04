"use client";

import Image from "next/image";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { CLIENTS } from "@/data/clients";

/**
 * Client rail. The track is rendered twice and translated by exactly -100%,
 * which is what makes the loop seamless rather than snapping at the join.
 * Greyscale at rest keeps twenty mismatched logo treatments from fighting
 * the palette; colour returns on hover.
 */
export function TrustMarquee() {
  return (
    <section className="overflow-hidden border-y border-[var(--hairline)] py-[clamp(2.25rem,3.6vw,3.25rem)]">
      <div className="container-page">
        <Reveal className="mb-[clamp(1.5rem,2.6vw,2.25rem)] flex flex-wrap items-center justify-between gap-4">
          <Eyebrow tone="muted">Trusted by</Eyebrow>
          <p className="max-w-[32em] text-sm text-ink-600 md:ml-auto md:text-right">
            Telecom operators, regulators, banks and national programmes across
            Pakistan, Iraq, Kenya, Sudan and Nigeria.
          </p>
        </Reveal>
      </div>

      <div className="group relative flex [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 animate-[marquee_46s_linear_infinite] items-center gap-[clamp(2.5rem,5vw,4.5rem)] pr-[clamp(2.5rem,5vw,4.5rem)] group-hover:[animation-play-state:paused]"
          >
            {CLIENTS.map((client) => (
              <Image
                key={`${copy}-${client.src}`}
                src={client.src}
                alt={copy === 0 ? client.name : ""}
                width={client.width}
                height={client.height}
                className="h-[clamp(1.5rem,2.2vw,2rem)] w-auto max-w-32 object-contain opacity-50 grayscale transition duration-400 ease-[var(--ease-expo)] hover:opacity-100 hover:grayscale-0"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
