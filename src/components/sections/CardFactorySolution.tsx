"use client";

import Image from "next/image";
import {
  BookOpen,
  CreditCard,
  DoorClosed,
  FileText,
  GaugeCircle,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useRef } from "react";
import { ArrowButton } from "@/components/brand/ArrowButton";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Pip } from "@/components/brand/Pip";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { SITE } from "@/data/site";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { DUR, GSAP_EASE, SHIFT, STAGGER } from "@/lib/motion";

type Module = { abbr: string; title: string; body: string; icon: LucideIcon };

const MODULES: Module[] = [
  {
    abbr: "CMS",
    title: "Card Management",
    body: "Production orders, inventory and personalisation data tracked from input file to finished card.",
    icon: CreditCard,
  },
  {
    abbr: "QMS",
    title: "Quality Management",
    body: "Inline quality control against GSMA and ISO requirements, with an auditable record for every batch.",
    icon: GaugeCircle,
  },
  {
    abbr: "ACS",
    title: "Access Control",
    body: "Zoned physical access across the plant — the control that a SAS-UP audit examines first.",
    icon: DoorClosed,
  },
  {
    abbr: "DMS",
    title: "Document Management",
    body: "Controlled procedures, revisions and sign-off, so the documented process matches the running one.",
    icon: FileText,
  },
  {
    abbr: "LMS",
    title: "Learning Management",
    body: "Operator training and competency records, mapped to the roles the accreditation requires.",
    icon: BookOpen,
  },
  {
    abbr: "STPAY",
    title: "Secure Tech Pay",
    body: "Tokenised wallet with virtual and contactless cards, and API connectivity for banks and fintechs.",
    icon: Wallet,
  },
];

/**
 * Card Factory Solution — the group's manufacturing side, surfaced on the
 * products page so the catalogue does not stop at terminals.
 *
 * Structured the way the Cards site frames it (accredited plant, then the
 * five factory systems, then the wallet), but rebuilt in this design system
 * rather than copied: same information architecture, different execution.
 */
export function CardFactorySolution() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-module-card]", root);
      gsap.fromTo(
        cards,
        { opacity: 0, y: SHIFT.base },
        {
          opacity: 1,
          y: 0,
          duration: DUR.reveal,
          ease: GSAP_EASE.out,
          stagger: STAGGER.tight,
          scrollTrigger: { trigger: cards[0], start: "top 88%", once: true },
        },
      );
    },
    { scope },
  );

  return (
    <section ref={scope} className="surface-navy relative overflow-hidden py-section text-white">
      <div
        aria-hidden
        className="dot-matrix pointer-events-none absolute inset-0 text-white opacity-[0.06]"
      />

      <div className="container-page relative">
        <div className="mb-[clamp(2.5rem,4vw,3.5rem)] grid items-end gap-x-8 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal className="mb-5">
              <Eyebrow index="02" tone="invert">
                Group capability
              </Eyebrow>
            </Reveal>
            <SplitReveal as="h2" className="text-display-lg text-white">
              Card Factory Solution
            </SplitReveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pb-1">
            <Reveal delay={0.1}>
              <p className="lede text-white/62">
                Secure Tech Cards manufactures telecom cards under GSMA SAS-UP
                accreditation — and packages the systems that run the plant.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Plant */}
        <div className="mb-[clamp(2.5rem,4vw,3.5rem)] grid items-center gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <div className="overflow-hidden rounded-lg border border-white/12">
              <Image
                src="/images/facility/head-office.jpg"
                alt="Secure Tech Towers, Islamabad — home of the group's card production"
                width={1400}
                height={1050}
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="aspect-16/10 w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <h3 className="mb-4 text-display-md text-white">
              One accredited plant, end to end.
            </h3>
            <p className="mb-6 text-sm text-white/62">
              High-volume smart card manufacturing, personalisation and
              fulfilment, run inside an environment audited against the GSMA
              Security Accreditation Scheme and certified to ISO/IEC 27001:2022.
              Consultancy is available separately for operators building their
              own compliance path.
            </p>
            <ul className="mb-7 grid gap-2.5">
              {[
                "GSMA SAS-UP accredited UICC production",
                "ISO/IEC 27001:2022 certified operations",
                "Compliance strategy, process and staff training",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-sm text-white/72">
                  <Pip className="mt-2" />
                  {line}
                </li>
              ))}
            </ul>
            <ArrowButton href={SITE.sisterSite} external variant="outlineInvert" size="sm">
              Visit Secure Tech Cards
            </ArrowButton>
          </Reveal>
        </div>

        {/* Factory systems */}
        <Reveal className="mb-6">
          <hr className="border-0 border-t border-white/13" />
          <p className="mt-6 font-mono text-label uppercase tracking-[0.13em] text-white/55">
            Factory digitalisation modules
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((module) => {
            const Icon = module.icon;
            return (
              <article
                key={module.abbr}
                data-module-card
                className="group relative isolate overflow-hidden rounded-lg border border-white/12 bg-white/[0.025] p-6 transition-[transform,border-color,background-color] duration-400 ease-[var(--ease-expo)] hover:-translate-y-[3px] hover:border-brand-400/60 hover:bg-white/[0.05]"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="grid size-10 place-items-center rounded-md border border-white/14 text-brand-300 transition-colors duration-400 group-hover:border-brand-400/60">
                    <Icon className="size-4.5" strokeWidth={1.5} />
                  </span>
                  <span className="font-mono text-label uppercase tracking-[0.13em] text-white/45">
                    {module.abbr}
                  </span>
                </div>
                <h4 className="mb-2 text-[1.0625rem] font-semibold tracking-[-0.014em] text-white">
                  {module.title}
                </h4>
                <p className="text-sm text-white/62">{module.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
