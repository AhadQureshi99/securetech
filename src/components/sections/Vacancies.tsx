"use client";

import { Inbox } from "lucide-react";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { RoleCard } from "@/components/cards/RoleCard";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { DISCIPLINES, VACANCIES } from "@/data/company";
import { SITE } from "@/data/site";

const FIELDS = [
  { name: "name", label: "Full name", required: true, half: true },
  { name: "email", label: "Email", type: "email", required: true, half: true },
  { name: "phone", label: "Phone", type: "tel", half: true },
  {
    name: "discipline",
    label: "Discipline",
    type: "select",
    half: true,
    options: [
      "Embedded / firmware",
      "Backend & platform",
      "Android / field applications",
      "Systems & network",
      "Programme delivery",
      "Quality assurance",
      "Other",
    ],
  },
  {
    name: "portfolio",
    label: "CV or portfolio link",
    placeholder: "https://",
  },
  {
    name: "message",
    label: "A system you have built, and what went wrong with it",
    type: "textarea",
    required: true,
    placeholder:
      "We would rather read about one thing you know deeply than a list of technologies.",
  },
] as const;

/**
 * Vacancies and the open application, deliberately in one section: the empty
 * state is only defensible if the alternative route is immediately underneath
 * it rather than a page away.
 */
export function Vacancies() {
  return (
    <section id="apply" className="scroll-mt-24 py-section">
      <div className="container-page">
        <div className="grid gap-x-7 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow index="02">Openings</Eyebrow>
            </Reveal>
            <SplitReveal
              as="h2"
              className="my-[clamp(1rem,1.8vw,1.5rem)] text-display-lg text-ink-900"
            >
              Current vacancies
            </SplitReveal>

            <Reveal delay={0.1}>
              <div className="mb-8 flex items-start gap-4 rounded-lg border border-dashed border-[var(--hairline-strong)] bg-ink-50 p-[clamp(1.25rem,2.2vw,1.75rem)]">
                <Inbox className="mt-0.5 size-5 shrink-0 text-ink-500" strokeWidth={1.5} />
                <div>
                  <strong className="mb-1.5 block font-semibold text-ink-900">
                    No positions open right now
                  </strong>
                  <p className="text-sm leading-[1.7] text-ink-600">
                    Hiring here follows programme awards, so vacancies appear in
                    bursts. Send an open application and it stays on file — when
                    a programme lands, this is the list we read first.
                  </p>
                </div>
              </div>

              <p className="text-sm leading-[1.7] text-ink-600">
                Prefer email? Write to{" "}
                <a
                  href={`mailto:${SITE.careersEmail}`}
                  className="text-brand-600 underline decoration-brand-200 underline-offset-4 transition-colors duration-400 ease-[var(--ease-expo)] hover:decoration-brand-500"
                >
                  {SITE.careersEmail}
                </a>
                .
              </p>
            </Reveal>
          </div>

          {/* Disciplines. Real postings drop in here when VACANCIES fills. */}
          <div className="lg:col-span-12">
            <Reveal className="mb-6 flex flex-wrap items-baseline justify-between gap-3 border-t border-[var(--hairline)] pt-8">
              <h3 className="text-display-sm text-ink-900">
                {VACANCIES.length > 0 ? "Open roles" : "Disciplines we hire into"}
              </h3>
              <p className="text-sm text-ink-500">
                Every card routes to the open application.
              </p>
            </Reveal>

            <Reveal stagger={0.05} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(VACANCIES.length > 0 ? VACANCIES : DISCIPLINES).map((role) => (
                <RoleCard key={role.title} role={role} />
              ))}
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.15}>
              <div className="rounded-lg border border-[var(--hairline)] bg-white p-[clamp(1.25rem,2.6vw,2.25rem)]">
                <h3 className="mb-1.5 text-display-sm text-ink-900">
                  Open application
                </h3>
                <p className="mb-7 text-sm leading-[1.7] text-ink-600">
                  Read by an engineer, not a keyword filter. Expect a reply
                  within two weeks.
                </p>
                <EnquiryForm
                  fields={FIELDS}
                  submitLabel="Send application"
                  successTitle="Application received"
                  successBody="It is with the engineering team. If there is a fit, you will hear from us within two weeks."
                  note="We never pass your details to third parties."
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
