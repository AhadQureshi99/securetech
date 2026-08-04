"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useRef, useState } from "react";
import { Pip } from "@/components/brand/Pip";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { DUR, GSAP_EASE, SHIFT, STAGGER } from "@/lib/motion";

const PANELS = [
  {
    title: "GSMA SAS-UP accredited",
    body: "Production runs inside a facility audited against the GSMA Security Accreditation Scheme for UICC Production.",
    verified: true,
  },
  {
    title: "ISO/IEC 27001:2022",
    body: "An information security management system covering the plant, the data and the personnel who handle both.",
    verified: true,
  },
  {
    title: "Factory systems, in-house",
    body: "Card management, quality control, access control, document and learning systems — built and maintained by the same team.",
    verified: false,
  },
];

/**
 * The group's own facility film. It is 112 MB unencoded, so it is NOT bundled
 * — shipping it would have made the deploy 30× larger than the entire rest of
 * the site. Until it is transcoded (see README), it streams from the Cards
 * site where it already lives.
 *
 * Nothing loads until the visitor asks for it: poster frame, `preload="none"`,
 * and a link out if the remote host refuses the request.
 */
const VIDEO_SRC =
  "https://www.securetech-cards.com/assets/images/Secure%20Tech%20Cards-12.mp4";

/**
 * Factory showcase.
 *
 * The panels beside the film use the same card language as What We Do,
 * entering on a short stagger as the section arrives.
 */
export function FactoryShowcase() {
  const scope = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-factory-card]", root);
      gsap.fromTo(
        cards,
        { opacity: 0, y: SHIFT.base },
        {
          opacity: 1,
          y: 0,
          duration: DUR.reveal,
          ease: GSAP_EASE.out,
          stagger: STAGGER.card,
          scrollTrigger: { trigger: cards[0], start: "top 88%", once: true },
        },
      );

      const frame = root.querySelector("[data-factory-frame]");
      if (frame) {
        gsap.fromTo(
          frame,
          { opacity: 0, y: SHIFT.lg },
          {
            opacity: 1,
            y: 0,
            duration: DUR.long,
            ease: GSAP_EASE.out,
            scrollTrigger: { trigger: frame, start: "top 88%", once: true },
          },
        );
      }
    },
    { scope },
  );

  return (
    <section ref={scope} className="py-section">
      <div className="container-page">
        <SectionHeading
          index="03"
          eyebrow="Inside the facility"
          title="Where the credentials are made."
          lede="Secure Tech Cards manufactures under accreditation in Islamabad — the same group, the same standards, the same accountability."
        />

        <div className="grid items-start gap-8 lg:grid-cols-12">
          {/* Video */}
          <div data-factory-frame className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-lg border border-[var(--hairline)] bg-ink-900">
              {playing ? (
                failed ? (
                  <div className="grid aspect-video w-full place-items-center bg-ink-950 p-6 text-center">
                    <div>
                      <p className="mb-3 text-sm text-white/70">
                        The film could not be loaded here.
                      </p>
                      <a
                        href={VIDEO_SRC}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-brand-300 underline underline-offset-4"
                      >
                        Open it directly
                      </a>
                    </div>
                  </div>
                ) : (
                  <video
                    src={VIDEO_SRC}
                    controls
                    autoPlay
                    playsInline
                    preload="none"
                    onError={() => setFailed(true)}
                    className="aspect-video w-full bg-ink-950"
                  />
                )
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group relative block w-full cursor-pointer"
                  aria-label="Play the Secure Tech Cards facility film"
                >
                  <Image
                    src="/images/facility/hq-entrance.jpg"
                    alt="Entrance to Secure Tech Towers, Islamabad"
                    width={1600}
                    height={900}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="aspect-video w-full object-cover transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-[1.03]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-950/20 to-transparent"
                  />

                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid size-16 place-items-center rounded-full border border-white/35 bg-white/12 backdrop-blur-md transition-[background-color,transform] duration-400 ease-[var(--ease-expo)] group-hover:scale-105 group-hover:bg-white/22">
                      <Play className="ml-0.5 size-5 fill-white text-white" strokeWidth={1} />
                    </span>
                  </span>

                  <span className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 p-5 text-left">
                    <span className="font-mono text-label uppercase tracking-[0.13em] text-white/75">
                      Facility film
                    </span>
                    <span className="text-sm font-medium text-white">
                      Secure Tech Cards, Islamabad
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Panels */}
          <div className="grid gap-4 lg:col-span-5">
            {PANELS.map((panel) => (
              <article
                key={panel.title}
                data-factory-card
                className="group relative isolate overflow-hidden rounded-lg border border-[var(--hairline)] bg-white p-6 transition-[transform,border-color] duration-400 ease-[var(--ease-expo)] hover:-translate-y-[3px] hover:border-brand-200"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-brand-50 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                />
                <h3 className="mb-2 flex items-center gap-2.5 text-[1.0625rem] font-semibold tracking-[-0.014em] text-ink-900">
                  {panel.verified ? <Pip /> : null}
                  {panel.title}
                </h3>
                <p className="text-sm text-ink-600">{panel.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
