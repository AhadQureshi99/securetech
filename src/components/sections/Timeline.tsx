"use client";

import { useRef } from "react";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { TIMELINE } from "@/data/company";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

/**
 * Pinned horizontal scroll — earned here, where ten milestones genuinely
 * exceed the width of any screen.
 *
 * The section pins for exactly the distance the rail needs to travel, so the
 * scrollbar still tells the truth about how much is left. A progress line
 * tracks the same scrub value, which keeps the visitor oriented while the
 * page is not moving vertically.
 *
 * `pinType: "transform"` because this tree renders inside an animated route
 * wrapper; transform-pinning is immune to any ancestor that turns out to
 * establish a containing block. Below `lg` it degrades to a native swipe rail
 * rather than fighting the browser's own horizontal gesture.
 */
export function Timeline() {
  const scope = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const trackEl = track.current;
        const viewportEl = viewport.current;
        const sectionEl = scope.current;
        const bar = progress.current;
        if (!trackEl || !viewportEl || !sectionEl) return;

        const distance = () => Math.max(0, trackEl.scrollWidth - viewportEl.clientWidth);

        const tween = gsap.to(trackEl, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionEl,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: viewportEl,
            pinType: "transform",
            anticipatePin: 1,
            scrub: 0.9,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (bar) gsap.set(bar, { scaleX: self.progress });
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(trackEl, { clearProps: "transform" });
        };
      });

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      return () => {
        window.removeEventListener("load", onLoad);
        mm.revert();
      };
    },
    { scope },
  );

  return (
    <section ref={scope} id="timeline" className="scroll-mt-24 bg-ink-50">
      <div
        ref={viewport}
        className="relative flex flex-col justify-center overflow-hidden py-section lg:h-screen lg:py-[clamp(3rem,7vh,6rem)]"
      >
        <div className="container-page">
          <div className="mb-[clamp(2rem,3.5vw,3rem)] grid items-end gap-x-7 gap-y-5 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal className="mb-[clamp(1rem,1.8vw,1.5rem)]">
                <Eyebrow index="02">The record</Eyebrow>
              </Reveal>
              <SplitReveal as="h2" className="text-display-lg text-ink-900">
                Programme by programme.
              </SplitReveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:pb-1.5">
              <Reveal delay={0.12}>
                <p className="lede text-ink-600">
                  Eleven years of national deployments, from the first office in
                  Islamabad to a purpose-built head office.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Rail */}
        <div className="container-page lg:pr-0">
          <div
            ref={track}
            className="flex snap-x snap-mandatory gap-0 overflow-x-auto pb-2 lg:w-max lg:snap-none lg:overflow-visible lg:pb-0 lg:will-change-transform [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TIMELINE.map((entry) => (
              <article
                key={entry.year}
                className="group relative w-[clamp(16rem,74vw,22rem)] shrink-0 snap-start border-t border-[var(--hairline)] py-[clamp(1.5rem,2.4vw,2.125rem)] pr-[clamp(1.25rem,2vw,1.75rem)] lg:w-[clamp(17rem,22vw,21rem)]"
              >
                <span className="absolute -top-1 left-0 block size-[7px] rounded-full bg-ink-200 transition-[background-color,transform] duration-400 ease-[var(--ease-expo)] group-hover:scale-[1.35] group-hover:bg-verify-500" />
                <p className="tnum mb-3.5 font-mono text-sm font-medium tracking-[0.08em] text-brand-500">
                  {entry.year}
                </p>
                <h3 className="mb-2 text-[clamp(1.0625rem,1.3vw,1.1875rem)] font-semibold tracking-[-0.014em] text-ink-900">
                  {entry.title}
                </h3>
                <p className="text-sm text-ink-600">{entry.body}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Scrub progress — orientation while the page is pinned */}
        <div className="container-page mt-8 hidden lg:block">
          <div className="h-px w-full bg-[var(--hairline)]">
            <span
              ref={progress}
              className="block h-px origin-left scale-x-0 bg-brand-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
