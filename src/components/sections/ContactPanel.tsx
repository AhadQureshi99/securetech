"use client";

import { Clock, Mail, MapPin, Phone, Printer } from "lucide-react";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { SITE } from "@/data/site";

const FIELDS = [
  { name: "name", label: "Full name", required: true, half: true },
  { name: "organisation", label: "Organisation", required: true, half: true },
  { name: "email", label: "Work email", type: "email", required: true, half: true },
  { name: "phone", label: "Phone", type: "tel", half: true },
  {
    name: "interest",
    label: "What is this about?",
    type: "select",
    options: [
      "Biometric verification programme",
      "SIM issuance & registration",
      "Secure documentation & smart cards",
      "Access control & time attendance",
      "Device procurement",
      "Partnership or supply",
      "Something else",
    ],
  },
  {
    name: "message",
    label: "The constraint you are working under",
    type: "textarea",
    required: true,
    placeholder:
      "Volume, regulator, deadline, existing systems to integrate with — whatever actually shapes the decision.",
  },
] as const;

/**
 * Contact. The form leads and the direct channels sit beside it, because the
 * people who send national-scale enquiries are usually the same people who
 * would rather pick up a phone.
 */
export function ContactPanel() {
  return (
    <section className="py-section">
      <div className="container-page">
        <div className="grid gap-x-7 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index="01">Enquiry</Eyebrow>
            </Reveal>
            <SplitReveal
              as="h2"
              className="my-[clamp(1rem,1.8vw,1.5rem)] max-w-[18ch] text-display-lg text-ink-900"
            >
              Tell us what has to be true.
            </SplitReveal>
            <Reveal delay={0.1}>
              <p className="lede mb-9 max-w-[46ch] text-ink-600">
                The more specific the constraint, the more useful our first
                reply will be. An engineer reads every enquiry.
              </p>
              <EnquiryForm
                fields={FIELDS}
                submitLabel="Send enquiry"
                successTitle="Enquiry received"
                successBody="We will come back to you within one working day with a named engineer on the thread."
                note="Response within one working day."
              />
            </Reveal>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.2}>
              <div className="rounded-lg border border-[var(--hairline)] bg-ink-50 p-[clamp(1.25rem,2.2vw,1.875rem)]">
                <h3 className="mb-6 font-mono text-label uppercase tracking-[0.13em] text-ink-500">
                  Direct
                </h3>

                <ul className="grid gap-5">
                  <Detail icon={Phone} label="Switchboard">
                    <a
                      href={SITE.switchboardHref}
                      className="tnum font-mono text-sm text-ink-900 transition-colors duration-400 ease-[var(--ease-expo)] hover:text-brand-600"
                    >
                      {SITE.switchboard}
                    </a>
                  </Detail>

                  <Detail icon={Mail} label="Email">
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-sm break-all text-ink-900 transition-colors duration-400 ease-[var(--ease-expo)] hover:text-brand-600"
                    >
                      {SITE.email}
                    </a>
                  </Detail>

                  <Detail icon={Printer} label="Fax">
                    <span className="tnum font-mono text-sm text-ink-700">
                      {SITE.fax}
                    </span>
                  </Detail>

                  <Detail icon={MapPin} label="Head office">
                    <address className="not-italic text-sm leading-[1.65] text-ink-700">
                      {SITE.headOffice.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </Detail>

                  <Detail icon={Clock} label="Hours">
                    <span className="text-sm text-ink-700">{SITE.hours}</span>
                  </Detail>
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Detail({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Phone;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="grid grid-cols-[auto_1fr] items-start gap-3.5">
      <span className="mt-0.5 grid size-8 place-items-center rounded-sm border border-[var(--hairline-strong)] bg-white text-brand-500">
        <Icon className="size-3.5" strokeWidth={1.6} />
      </span>
      <div>
        <p className="mb-1 font-mono text-label uppercase tracking-[0.13em] text-ink-500">
          {label}
        </p>
        {children}
      </div>
    </li>
  );
}
