"use client";

import { Eyebrow } from "@/components/brand/Eyebrow";
import { MaskedImage } from "@/components/motion/MaskedImage";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";

/**
 * The company's position, stated once and plainly.
 *
 * The image is masked open and parallaxed rather than simply faded in: the
 * clip reveal gives the section a physical beat that a fade cannot, and the
 * slow drift keeps the column alive while the reader is on the prose.
 */
export function Positioning() {
  return (
    <section className="py-section">
      <div className="container-page">
        <div className="grid items-center gap-x-7 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow index="01">Position</Eyebrow>
            </Reveal>
            <SplitReveal
              as="h2"
              className="my-[clamp(1rem,1.8vw,1.5rem)] max-w-[16ch] text-display-lg text-ink-900"
            >
              Identity work leaves no room for guesswork.
            </SplitReveal>
            <Reveal delay={0.1}>
              <div className="grid max-w-[52ch] gap-5 text-ink-600">
                <p className="lede">
                  A verification that fails at a polling station, a SIM issued
                  against the wrong thumbprint, an access door that opens for
                  the wrong badge — these are not bugs to be triaged next
                  sprint. They are failures of the public record.
                </p>
                <p className="text-[0.9375rem] leading-[1.75]">
                  Secure Tech Consultancy has built for that standard since
                  2008. We design the terminal, write the firmware, build the
                  matching platform and integrate it with the national database
                  — because splitting that chain across vendors is where
                  identity programmes usually break.
                </p>
                <p className="text-[0.9375rem] leading-[1.75]">
                  The work runs inside a GSMA SAS-UP accredited and ISO/IEC
                  27001:2022 certified environment, audited by the people whose
                  job is to find the gap before anyone else does.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <MaskedImage
              src="/images/facility/hq-entrance.jpg"
              alt="Secure Tech Towers head office, Sector I-9/3, Islamabad"
              width={1500}
              height={998}
              parallax={40}
              sizes="(max-width: 980px) 90vw, 38vw"
              className="rounded-lg"
              caption="Biometrically verified polling — a first for Pakistan."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
