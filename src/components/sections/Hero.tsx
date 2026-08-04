"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowButton } from "@/components/brand/ArrowButton";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Pip } from "@/components/brand/Pip";
import { Counter } from "@/components/motion/Counter";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { CERTIFICATIONS, HERO_STATS } from "@/data/site";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { DUR, GSAP_EASE, STAGGER } from "@/lib/motion";

/**
 * Hero.
 *
 * Rebuilt to be shorter and better balanced. The earlier version gave half
 * the fold to a floating device on a spinning ridge, which read as product
 * marketing rather than consultancy; the device now belongs to the 3D
 * products section further down the page.
 *
 * What replaces it is the company's own head office — a real photograph
 * carries authority that an illustrated device never will. Copy holds the
 * left, the image is a quiet counterweight on the right, and the whole
 * section sits comfortably inside one screen.
 *
 * Entrance is one short timeline: everything is settled in under a second.
 */
export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const q = gsap.utils.selector(root);

      if (prefersReducedMotion()) {
        gsap.set(q("[data-anim='hidden']"), { opacity: 1, y: 0 });
        gsap.set(q("[data-hero='mark']"), { "--u": 1 });
        gsap.set(q("[data-hero='frame']"), { clipPath: "inset(0% 0% 0% 0%)" });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: GSAP_EASE.out, duration: DUR.slow },
      });

      tl.to(q("[data-hero='eyebrow']"), { opacity: 1, y: 0 }, 0.05)
        // Image unclips alongside the headline rather than after it, so the
        // two halves of the composition arrive together.
        .to(
          q("[data-hero='frame']"),
          { clipPath: "inset(0% 0% 0% 0%)", duration: DUR.long },
          0.15,
        )
        .fromTo(
          q("[data-hero='frame'] img"),
          { scale: 1.14 },
          { scale: 1, duration: 1.3 },
          0.15,
        )
        .to(q("[data-hero='lede']"), { opacity: 1, y: 0 }, 0.42)
        .to(q("[data-hero='cta']"), { opacity: 1, y: 0 }, 0.5)
        // The single sanctioned use of green inside display type.
        .to(q("[data-hero='mark']"), { "--u": 1, duration: 0.8 }, 0.55)
        .to(
          q("[data-hero='stat']"),
          { opacity: 1, y: 0, stagger: STAGGER.card },
          0.78,
        );

      return () => tl.kill();
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className="relative overflow-hidden border-b border-[var(--hairline)] pb-[clamp(2rem,3vw,2.75rem)] pt-[calc(var(--nav-h)+clamp(1.75rem,3vw,2.75rem))]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(46rem_32rem_at_82%_-8%,var(--color-brand-50),transparent_70%)]"
      />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.03]" />

      <div className="container-page relative">
        <div className="grid items-center gap-x-8 gap-y-12 lg:grid-cols-12">
          {/* Copy */}
          <div className="lg:col-span-6">
            <div data-hero="eyebrow" data-anim="hidden" className="translate-y-2.5">
              <Eyebrow className="mb-6">Est. 2008 &nbsp;·&nbsp; Islamabad, Pakistan</Eyebrow>
            </div>

            <SplitReveal
              as="h1"
              immediate
              delay={0.12}
              className="mb-6 max-w-[15ch] text-display-xl text-ink-900"
            >
              Identity,{" "}
              <span
                data-hero="mark"
                className="[--u:0] bg-[linear-gradient(var(--color-verify-500),var(--color-verify-500))] bg-[position:0_100%] bg-no-repeat"
                style={{ backgroundSize: "calc(var(--u) * 100%) max(3px, 0.07em)" }}
              >
                verified
              </span>{" "}
              at national scale.
            </SplitReveal>

            <p
              data-hero="lede"
              data-anim="hidden"
              className="lede mb-8 max-w-[46ch] translate-y-2.5 text-ink-600"
            >
              Biometric verification, secure documentation and access control
              for governments, telecom operators and banks — engineered end to
              end, hardware and software, under one roof.
            </p>

            <div
              data-hero="cta"
              data-anim="hidden"
              className="flex translate-y-2.5 flex-wrap items-center gap-3"
            >
              <ArrowButton href="/#capabilities">Explore Solutions</ArrowButton>
              <ArrowButton href="/contact" variant="ghost">
                Talk to Our Team
              </ArrowButton>
            </div>

            <div
              data-hero="cta"
              data-anim="hidden"
              className="mt-8 flex translate-y-2.5 flex-wrap items-center gap-x-6 gap-y-2 border-t border-[var(--hairline)] pt-6"
            >
              {CERTIFICATIONS.map((cert) => (
                <span
                  key={cert.title}
                  className="inline-flex items-center gap-2 font-mono text-label uppercase tracking-[0.13em] text-ink-500"
                >
                  <Pip />
                  {cert.title}
                </span>
              ))}
            </div>
          </div>

          {/* Facility */}
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="relative">
              <div
                data-hero="frame"
                className="relative overflow-hidden rounded-lg border border-[var(--hairline)] bg-ink-100 [clip-path:inset(0%_0%_100%_0%)]"
              >
                <Image
                  src="/images/facility/head-office.jpg"
                  alt="Secure Tech Towers, the company's head office in Sector I-9/3, Islamabad"
                  width={1600}
                  height={1200}
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="aspect-4/3 w-full object-cover lg:aspect-5/4"
                />
                {/* A solid scrim bar, not a fade to transparent: the caption
                    has to stay legible over whatever part of the photograph
                    happens to sit behind it. */}
                {/* The photograph is the head office exterior, so the caption
                    says so — it previously read "production floor", which the
                    image does not show. */}
                <div className="absolute inset-x-0 bottom-0 border-t border-white/12 bg-ink-950/88 p-5 backdrop-blur-[6px]">
                  <p className="font-mono text-label uppercase tracking-[0.13em] text-white/80">
                    Secure Tech Towers
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Head office · Sector I-9/3, Islamabad
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stat band */}
        <div className="mt-[clamp(2rem,3vw,3rem)] grid border-t border-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
          {HERO_STATS.map((stat) => (
            <div
              key={stat.label}
              data-hero="stat"
              data-anim="hidden"
              className="translate-y-2.5 border-[var(--hairline)] py-6 pr-6 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:last:border-r-0"
            >
              <p className="tnum mb-1.5 text-[clamp(1.5rem,2.4vw,2.125rem)] font-medium leading-none tracking-[-0.03em] text-ink-900">
                {stat.animate ? (
                  <Counter
                    to={stat.value}
                    prefix={"prefix" in stat ? stat.prefix : ""}
                    suffix={"suffix" in stat ? stat.suffix : ""}
                  />
                ) : (
                  stat.value
                )}
              </p>
              <p className="font-mono text-label uppercase leading-[1.5] tracking-[0.13em] text-ink-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
