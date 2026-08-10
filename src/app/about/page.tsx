import type { Metadata } from "next";
import Image from "next/image";
import { ArrowButton } from "@/components/brand/ArrowButton";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Pip } from "@/components/brand/Pip";
import { MaskedImage } from "@/components/motion/MaskedImage";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Awards } from "@/components/sections/Awards";
import { CTA } from "@/components/sections/CTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { Partners } from "@/components/sections/Partners";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CERTIFICATIONS, SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Secure Tech Consultancy is an IT consulting and systems integration firm specialising in biometric verification, secure documentation and identity management. Our vision, leadership and team.",
};

/**
 * About Us.
 *
 * Follows the information architecture of the group's Cards site
 * (securetech-cards.com/about): who we are → vision → Chairman's message →
 * CEO's message → certifications → team. That sequence is how this business
 * actually establishes credibility — the accreditation only means something
 * once you know who signs for it.
 *
 * The wording throughout is written for Secure Tech Consultancy specifically,
 * not lifted from the Cards page — the two are related but distinct legal
 * entities, and the Cards intro paragraph describes a SIM manufacturer, which
 * this company is not. Structure is shared; claims are not.
 *
 * No photograph for the CEO message: the only portrait file supplied is
 * captioned "Chairman" at source, and reusing it for a second named
 * individual would misattribute a real person's photograph. Add one when
 * it's supplied — see the placeholder below.
 *
 * The delivery record (timeline, sectors, customers) lives on /company so
 * this page can stay about people and intent.
 */

const VALUES = [
  {
    title: "Ambition",
    body: "Programmes at national scale, in sectors where failure is visible and consequential.",
  },
  {
    title: "Integrity",
    body: "Accreditation is not paperwork. The audited process and the running process are the same process.",
  },
  {
    title: "Transformation",
    body: "Identity systems only pay off when the surrounding process changes with them. We plan for both.",
  },
  {
    title: "Innovation",
    body: "Current biometric, cryptographic and RFID technology, applied to the requirement rather than to a roadmap.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumb="About Us"
        title="Secure technology, delivered by the people who build it."
        lede="An IT consulting and systems integration firm, headquartered in Islamabad and delivering across Pakistan, the Middle East and Africa since 2008."
      />

      {/* ---------------------------------------------------------- Intro */}
      <section className="py-section">
        <div className="container-page">
          <div className="grid items-center gap-x-8 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <MaskedImage
                src="/images/facility/hq-entrance.jpg"
                alt="Entrance to Secure Tech Towers, Sector I-9/3, Islamabad"
                width={1400}
                height={1050}
                sizes="(max-width: 1024px) 100vw, 48vw"
                imageClassName="aspect-4/3 w-full"
                parallax={5}
              />
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal>
                <Eyebrow index="01">Who we are</Eyebrow>
              </Reveal>
              <SplitReveal as="h2" className="my-5 text-display-md text-ink-900">
                Identity work leaves no room for guesswork.
              </SplitReveal>
              <Reveal delay={0.1}>
                <p className="lede mb-5 text-ink-600">
                  We design, implement and manage secure identification systems
                  for governments and large organisations — using current
                  biometric, cryptographic and RFID technology to meet a
                  requirement precisely, not approximately.
                </p>
                <p className="mb-7 text-sm text-ink-600">
                  The practice spans ID cards and e-governance systems, secure
                  access control, interactive data acquisition, biometric
                  verification and enrolment, online time and attendance, smart
                  cards and RFID registration, project management and advisory
                  services — plus Android field applications for the telecom
                  sector, from biometric verification to funds disbursement.
                </p>

                <dl className="grid gap-5 border-t border-[var(--hairline)] pt-6 sm:grid-cols-2">
                  <div>
                    <dt className="mb-1.5 font-mono text-label uppercase tracking-[0.13em] text-ink-500">
                      Headquarters
                    </dt>
                    <dd className="text-sm text-ink-800">Islamabad, Pakistan</dd>
                  </div>
                  <div>
                    <dt className="mb-1.5 font-mono text-label uppercase tracking-[0.13em] text-ink-500">
                      Established
                    </dt>
                    <dd className="text-sm text-ink-800">{SITE.established}</dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Vision */}
      <section className="surface-navy relative overflow-hidden py-section text-white">
        <div
          aria-hidden
          className="dot-matrix pointer-events-none absolute inset-0 text-white opacity-[0.06]"
        />
        <div className="container-page relative">
          <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow index="02" tone="invert">
                  Our vision
                </Eyebrow>
              </Reveal>
              <SplitReveal as="h2" className="mt-5 text-display-lg text-white">
                A world-class facility, built here.
              </SplitReveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={0.1}>
                <p className="lede mb-8 text-white/72">
                  Through ambition, integrity, transformation and innovation,
                  we set out to be the identity partner governments and large
                  organisations call first — meeting international quality and
                  security standards as a matter of course, and holding
                  ourselves to what our customers actually need rather than to
                  what a brochure promises.
                </p>
              </Reveal>

              <Reveal
                stagger={0.05}
                className="mb-8 grid gap-px overflow-hidden rounded-lg bg-white/12 sm:grid-cols-2"
              >
                {VALUES.map((value) => (
                  <div key={value.title} className="bg-ink-950 p-6">
                    <h3 className="mb-2 text-[1.0625rem] font-semibold tracking-[-0.014em] text-white">
                      {value.title}
                    </h3>
                    <p className="text-sm text-white/62">{value.body}</p>
                  </div>
                ))}
              </Reveal>

              <Reveal delay={0.15}>
                <ArrowButton href="/contact" variant="outlineInvert" size="sm">
                  Request the Company Profile
                </ArrowButton>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- Leadership */}
      <section className="py-section">
        <div className="container-page">
          <SectionHeading
            index="03"
            eyebrow="Leadership"
            title="Accountable at the top."
            lede="Security commitments signed at board level, and held to at every level below it."
          />

          <div className="grid items-start gap-x-8 gap-y-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <div className="overflow-hidden rounded-lg border border-[var(--hairline)] bg-ink-50">
                <Image
                  src="/images/people/chairman.jpg"
                  alt="Brigadier (Retd) Saleem Ahmed Moeen, Chairman"
                  width={900}
                  height={905}
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="aspect-square w-full object-cover"
                />
              </div>
              <div className="mt-5">
                <p className="font-mono text-label uppercase tracking-[0.13em] text-brand-500">
                  Chairman
                </p>
                <h3 className="mt-2 text-display-sm text-ink-900">
                  Brigadier (Retd) Saleem Ahmed Moeen
                </h3>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
              <blockquote className="border-l-2 border-brand-500 pl-6">
                <p className="lede mb-5 text-ink-700">
                  &ldquo;Our commitment to robust security measures is
                  unwavering.&rdquo;
                </p>
              </blockquote>

              <p className="text-sm text-ink-600">
                The Chairman&apos;s message frames the security management system
                as the cornerstone of the company&apos;s operations — resourcing it
                and improving it continually, promoting security awareness at
                every level, aligning policy with regulation and industry
                practice, and reviewing the system as threats and technology
                change, with transparency and accountability throughout.
              </p>
            </Reveal>
          </div>

          {/* CEO — text only. No photo: the one portrait supplied is
              captioned "Chairman" at source, and reusing it here would
              misattribute a real person's photograph to someone else. */}
          <div className="mt-12 grid items-start gap-x-8 gap-y-6 border-t border-[var(--hairline)] pt-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="grid size-16 place-items-center rounded-full border border-[var(--hairline-strong)] bg-ink-50 font-mono text-sm font-medium text-ink-500">
                UM
              </div>
              <div className="mt-5">
                <p className="font-mono text-label uppercase tracking-[0.13em] text-brand-500">
                  Chief Executive Officer
                </p>
                <h3 className="mt-2 text-display-sm text-ink-900">Umer Moeen</h3>
              </div>
            </div>

            <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
              {/* Paraphrased, not quoted: attributing invented direct speech
                  to a real, named executive would misrepresent what he has
                  actually said. This describes the substance of his message
                  in third person instead. */}
              <p className="lede text-ink-700">
                The CEO frames the group&apos;s manufacturing arm as a national
                capability rather than an ordinary vendor relationship — one
                built on an in-house team, a homegrown push toward
                technological independence, and a quality culture that treats
                GSMA and ISO 27001:2022 as a floor to build on, not a
                certificate to file away.
              </p>
            </Reveal>
          </div>

          {/* Certifications */}
          <div className="mt-12 border-t border-[var(--hairline)] pt-12">
            <Eyebrow tone="muted" className="mb-5">
              Group accreditation
            </Eyebrow>
            <div className="grid gap-4 sm:grid-cols-2">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.title}
                  className="rounded-lg border border-[var(--hairline)] bg-ink-50 p-5"
                >
                  <p className="mb-1.5 flex items-center gap-2 font-semibold text-ink-900">
                    <Pip />
                    {cert.title}
                  </p>
                  <p className="text-[0.8125rem] text-ink-600">{cert.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Team */}
      <section className="bg-ink-50 py-section">
        <div className="container-page">
          <div className="grid items-center gap-x-8 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow index="04">Our team</Eyebrow>
              </Reveal>
              <SplitReveal as="h2" className="my-5 text-display-md text-ink-900">
                Engineers, not account managers.
              </SplitReveal>
              <Reveal delay={0.1}>
                <p className="lede mb-5 text-ink-600">
                  A multidisciplinary team of engineers and compliance
                  specialists working to GSMA and ISO 27001:2022 standards.
                  Experience in secure manufacturing and digital transformation
                  means the expertise on a project is practical and hands-on —
                  the people who scope the work are the people who deliver it.
                </p>
                <p className="mb-8 text-sm text-ink-600">
                  Long tenures are the norm here, which is a large part of why
                  customers have stayed with us since the company was founded.
                </p>
                <div className="flex flex-wrap gap-3">
                  <ArrowButton href="/company" variant="ghost" size="sm">
                    The delivery record
                  </ArrowButton>
                  <ArrowButton href="/careers" variant="ghost" size="sm">
                    Join the team
                  </ArrowButton>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <MaskedImage
                src="/images/people/team.jpg"
                alt="The Secure Tech team"
                width={1400}
                height={777}
                sizes="(max-width: 1024px) 100vw, 48vw"
                imageClassName="aspect-16/9 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <Awards />

      <Partners
        index="06"
        title="The organisations that keep coming back."
        lede="Telecom operators, regulators, banks, armed forces and national programmes across Pakistan, Iraq, Kenya, Sudan and Nigeria — most of them repeat customers."
      />

      <CTA
        eyebrow="Work with us"
        title="Seventeen years of delivery, available to you."
        body="Whether you are specifying a national programme or replacing an under-performing verification estate, start with a conversation about the constraint you are actually under."
        secondary={{ label: "See the record", href: "/company" }}
      />
    </>
  );
}
