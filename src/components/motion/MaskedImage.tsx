"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { GSAP_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type MaskedImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  caption?: ReactNode;
  /** Vertical drift across the viewport, in percent. 0 disables. */
  parallax?: number;
  /** Object-fit contain instead of cover — for device shots on a plinth. */
  contain?: boolean;
};

/**
 * The expensive-looking image reveal: the frame unclips upward while the
 * picture inside settles from an over-scale. Two simultaneous tweens on
 * different elements — a single clip-path wipe on its own reads flat.
 */
export function MaskedImage({
  src,
  alt,
  width = 1600,
  height = 1200,
  className,
  imageClassName,
  sizes = "(max-width: 980px) 100vw, 50vw",
  priority = false,
  caption,
  parallax = 0,
  contain = false,
}: MaskedImageProps) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const frameEl = frame.current;
      const innerEl = inner.current;
      if (!frameEl || !innerEl) return;

      if (prefersReducedMotion()) {
        gsap.set(frameEl, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 });
        gsap.set(innerEl, { scale: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: frameEl, start: "top 88%", once: true },
      });

      gsap.set(frameEl, { opacity: 1 });

      tl.fromTo(
        frameEl,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: GSAP_EASE.out },
      ).fromTo(
        innerEl,
        { scale: 1.26 },
        { scale: 1, duration: 1.7, ease: GSAP_EASE.out },
        0,
      );

      if (parallax !== 0) {
        gsap.fromTo(
          innerEl,
          { yPercent: -parallax / 2 },
          {
            yPercent: parallax / 2,
            ease: "none",
            scrollTrigger: {
              trigger: frameEl,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: frame },
  );

  return (
    <figure
      ref={frame}
      data-anim="hidden"
      className={cn(
        "relative overflow-hidden rounded-lg border border-[var(--hairline)] bg-ink-50",
        className,
      )}
    >
      <div ref={inner} className="will-change-transform">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className={cn(
            "h-full w-full",
            contain ? "object-contain" : "object-cover",
            imageClassName,
          )}
        />
      </div>

      {caption ? (
        <figcaption className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-ink-950/90 px-5 py-3.5 font-mono text-label uppercase tracking-[0.13em] text-white backdrop-blur-[6px]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
