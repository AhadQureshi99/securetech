import type { Transition, Variants } from "framer-motion";

/**
 * One motion vocabulary, shared by GSAP and Framer Motion.
 *
 * The whole site decelerates on the same curve: the cubic-bezier below is
 * registered with GSAP's CustomEase under the name `quint`, so a scroll-driven
 * reveal and a hover transition are running literally the same easing rather
 * than two curves that merely look similar.
 */

export const EASE = {
  /**
   * Primary — easeOutQuint. Leaves immediately, decelerates for a long time.
   * This exact curve is the one the reference site uses for every reveal and
   * every hover, and `GSAP_EASE.out` is registered as the same cubic so a
   * scroll-driven tween and a CSS hover cannot drift apart.
   */
  expo: [0.22, 1, 0.36, 1],
  /** For things that leave as well as arrive. */
  inOut: [0.62, 0.05, 0.3, 1],
  /** Short, mechanical — used for tiny state flips. */
  snap: [0.33, 1, 0.68, 1],
} as const satisfies Record<string, [number, number, number, number]>;

export const GSAP_EASE = {
  /** CustomEase registered in `lib/gsap` from `EASE.expo`. */
  out: "quint",
  inOut: "power4.inOut",
  soft: "power3.out",
} as const;

/**
 * Durations, in seconds.
 *
 * Calibrated against the reference site rather than guessed: its hover and
 * state transitions measure 0.28–0.42s and its reveals 0.62s. Only display
 * type is allowed to run longer, because a masked line travelling its own
 * height needs the extra beat to read as deliberate instead of nervous.
 */
export const DUR = {
  micro: 0.16,
  fast: 0.24,
  base: 0.36,
  slow: 0.58,
  reveal: 0.72,
  long: 1.0,
} as const;

/** Stagger steps, in seconds. Tight enough to read as one gesture. */
export const STAGGER = {
  line: 0.05,
  card: 0.06,
  row: 0.05,
  tight: 0.03,
} as const;

/**
 * Travel distances, in px.
 *
 * Deliberately small. On a consultancy site movement should be felt at the
 * edge of attention, not watched — anything past ~24px starts reading as a
 * slide deck transition.
 */
export const SHIFT = {
  sm: 10,
  base: 16,
  lg: 24,
} as const;

export const spring = {
  soft: { type: "spring", stiffness: 220, damping: 30, mass: 0.9 },
  snappy: { type: "spring", stiffness: 420, damping: 32, mass: 0.7 },
} as const satisfies Record<string, Transition>;

/** Fade + rise, the default entrance for non-scroll-driven components. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, ease: EASE.expo, delay: i * STAGGER.card },
  }),
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.slow, ease: EASE.expo } },
};

/** Parent that hands a stagger down to `fadeUp` children. */
export const stagger = (step: number = STAGGER.card, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});
