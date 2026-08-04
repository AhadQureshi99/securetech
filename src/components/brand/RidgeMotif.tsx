"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { GSAP_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Concentric rotated ellipses, widening outward. */
const RINGS = Array.from({ length: 14 }, (_, i) => {
  const rx = 24 + i * 13;
  return { rx, ry: +(rx * 0.74).toFixed(1), opacity: +(0.55 - i * 0.032).toFixed(3) };
});

/** The one ring that carries the verification colour. */
const ACCENT_INDEX = 3;

type Variant = "brand" | "invert";

/**
 * The signature device: fingerprint ridges crossed with a radar sweep.
 * Original to Secure Tech, and specific to an identity business in a way a
 * gradient blob never is.
 *
 * `draw` animates each ring on via stroke-dashoffset, staggered outward, and
 * adds a slow continuous rotation so the hero is never completely static.
 */
export function RidgeMotif({
  className,
  variant = "brand",
  draw = false,
  spin = false,
  opacity = 1,
}: {
  className?: string;
  variant?: Variant;
  draw?: boolean;
  spin?: boolean;
  opacity?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = ref.current;
      if (!svg) return;

      const shapes = Array.from(svg.querySelectorAll<SVGGeometryElement>("ellipse, path"));
      const group = svg.querySelector<SVGGElement>("g");

      if (prefersReducedMotion()) {
        gsap.set(shapes, { strokeDasharray: "none", strokeDashoffset: 0 });
        return;
      }

      if (draw) {
        shapes.forEach((shape) => {
          const len = shape.getTotalLength();
          gsap.set(shape, { strokeDasharray: len, strokeDashoffset: len });
        });

        gsap.to(shapes, {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: GSAP_EASE.out,
          stagger: 0.055,
          scrollTrigger: { trigger: svg, start: "top 92%", once: true },
        });
      }

      if (spin && group) {
        gsap.to(group, {
          rotation: "+=360",
          duration: 240,
          repeat: -1,
          ease: "none",
          svgOrigin: "200 200",
        });
      }
    },
    { scope: ref },
  );

  const stroke = variant === "invert" ? "#ffffff" : "var(--color-brand-500)";
  const accent = variant === "invert" ? "rgba(255,255,255,0.95)" : "var(--color-verify-500)";

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 400"
      role="presentation"
      aria-hidden="true"
      className={cn("h-auto w-full overflow-visible", className)}
      style={{ opacity }}
    >
      <g transform="rotate(-16 200 200)" fill="none" strokeWidth={1}>
        {RINGS.map((ring, i) => (
          <ellipse
            key={ring.rx}
            cx={200}
            cy={200}
            rx={ring.rx}
            ry={ring.ry}
            stroke={i === ACCENT_INDEX ? accent : stroke}
            opacity={i === ACCENT_INDEX ? 0.9 : ring.opacity}
          />
        ))}
        {/* Ridge breaks — the detail that stops it reading as a plain target */}
        <path d="M104 262c26 22 62 32 96 30" stroke={stroke} opacity={0.34} />
        <path d="M296 138c-26-22-62-32-96-30" stroke={stroke} opacity={0.34} />
      </g>
    </svg>
  );
}
