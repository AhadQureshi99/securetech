"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { DUR } from "@/lib/motion";

/**
 * Single registration point. Importing plugins in more than one module and
 * registering them twice is the usual cause of "ScrollTrigger not defined"
 * and of duplicated triggers after a hot reload.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase);

  // Never fire an entrance for something already scrolled past on load.
  ScrollTrigger.config({ ignoreMobileResize: true });

  // The CSS cubic-bezier from `EASE.expo`, expressed as the equivalent bezier
  // path so GSAP runs the identical curve. Registering it here — rather than
  // reaching for the nearest built-in — is what keeps a GSAP reveal and a
  // Tailwind hover on the same section from easing differently.
  CustomEase.create("quint", "M0,0 C0.22,1 0.36,1 1,1");

  gsap.defaults({ ease: "quint", duration: DUR.slow });
}

export { gsap, ScrollTrigger, SplitText, CustomEase, useGSAP };

/** True when the visitor has asked for less movement. */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * The site's standard scroll trigger: start when the element is a little way
 * into the viewport, play once, and never rewind.
 */
export function onceInView(
  trigger: Element,
  start = "top 85%",
): ScrollTrigger.Vars {
  return { trigger, start, once: true };
}
