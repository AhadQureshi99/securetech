"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const LenisContext = createContext<Lenis | null>(null);

/** The live Lenis instance, or null under reduced-motion / before mount. */
export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const raf = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    // Confirms JS is live, which is what un-hides GSAP-animated elements.
    document.documentElement.classList.add("js-ready");

    if (prefersReducedMotion()) {
      ScrollTrigger.refresh();
      return;
    }

    const instance = new Lenis({
      // lerp mode rather than duration/easing: the glide stays consistent
      // regardless of how large a wheel delta the trackpad throws at it.
      // 0.1 is the reference site's value — lower drifts into seasick, higher
      // loses the glide that makes the whole page feel weighted.
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.7,
      smoothWheel: true,
      // Touch devices already have native inertia; smoothing it twice feels
      // laggy and breaks the expectation of the platform.
      syncTouch: false,
      // Route in-page hash links through Lenis. Without this every `/#anchor`
      // jumps instantly and breaks the illusion the smooth scroll creates.
      anchors: true,
      // Lets genuinely scrollable children (overflow panels, the mobile menu)
      // consume their own wheel events instead of driving the page behind them.
      allowNestedScroll: true,
      // GSAP's ticker drives the loop so Lenis and ScrollTrigger advance in
      // the same frame. Two independent RAF loops = one frame of jitter.
      autoRaf: false,
    });

    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => instance.raf(time * 1000);
    raf.current = tick;
    gsap.ticker.add(tick);
    // Without this, GSAP tries to "catch up" after a long frame and Lenis
    // lurches.
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      if (raf.current) gsap.ticker.remove(raf.current);
      instance.off("scroll", ScrollTrigger.update);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
