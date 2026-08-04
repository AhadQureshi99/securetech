"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Pip } from "@/components/brand/Pip";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { AWARDS, CERTIFICATIONS } from "@/data/site";
import { REASONS } from "@/data/services";

export function WhyChooseUs() {
  return (
    <section className="py-section">
      <div className="container-page">
        <SectionHeading
          index="04"
          eyebrow="Why Secure Tech"
          title="Institutions don't buy demos."
          lede="They buy delivery records. Here is ours — and the accreditation that sits behind it."
        />

        <div className="grid items-start gap-x-7 gap-y-10 lg:grid-cols-12">
          {/* Proof points */}
          <div className="lg:col-span-6">
            <Reveal stagger={0.09}>
              {REASONS.map((reason) => (
                <article
                  key={reason.title}
                  className="grid grid-cols-[auto_1fr] gap-x-[clamp(1rem,1.6vw,1.375rem)] gap-y-4 border-t border-[var(--hairline)] py-[clamp(1.25rem,2.1vw,1.75rem)] last:border-b"
                >
                  <span className="mt-0.5 grid size-6.5 place-items-center rounded-full bg-verify-50 text-verify-700">
                    <Check className="size-3.5" strokeWidth={2.2} />
                  </span>
                  <div>
                    <h3 className="mb-1.5 text-[clamp(1.0625rem,1.35vw,1.1875rem)] font-semibold tracking-[-0.014em] text-ink-900">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-ink-600">{reason.body}</p>
                  </div>
                </article>
              ))}
            </Reveal>
          </div>

          {/* Accreditation panel */}
          <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8">
            <div className="overflow-hidden rounded-lg border border-[var(--hairline)] bg-white">
              <div className="border-b border-[var(--hairline)] bg-ink-50 p-[clamp(1.25rem,2vw,1.75rem)]">
                <Eyebrow tone="muted" className="mb-4">
                  Accreditation
                </Eyebrow>
                <ul className="grid gap-3.5">
                  {CERTIFICATIONS.map((cert) => (
                    <li
                      key={cert.title}
                      className="grid grid-cols-[auto_1fr] items-start gap-3 text-sm"
                    >
                      <Pip className="mt-1.5" />
                      <div>
                        <strong className="block font-semibold text-ink-900">
                          {cert.title}
                        </strong>
                        <span className="text-[0.8125rem] text-ink-600">
                          {cert.detail}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-[clamp(1.25rem,2vw,1.75rem)]">
                <Eyebrow tone="muted">Recognition</Eyebrow>
                <ul className="mt-4 grid">
                  {AWARDS.map((award, i) => (
                    <li
                      key={award}
                      className="grid grid-cols-[auto_1fr] gap-3.5 border-t border-[var(--hairline)] py-3.5 text-sm text-ink-600"
                    >
                      <span className="tnum pt-1 font-mono text-label tracking-[0.1em] text-ink-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/company"
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-500"
                >
                  The full company record
                  <ArrowUpRight className="size-3 transition-transform duration-400 ease-[var(--ease-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
