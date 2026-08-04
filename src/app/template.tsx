"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { ScrollTrigger } from "@/lib/gsap";
import { EASE } from "@/lib/motion";

/**
 * Route transition. `template.tsx` remounts on every navigation, which is what
 * makes an enter animation possible in the App Router.
 *
 * The curtain is a fixed overlay and the page wrapper only animates opacity —
 * a transform or clip on the wrapper would create a containing block and break
 * every ScrollTrigger pin underneath it.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);

    // Fresh page, fresh measurements.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [lenis]);

  return (
    <>
      <motion.div
        aria-hidden
        initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 100% 0%)" }}
        transition={{ duration: 0.85, ease: EASE.expo }}
        className="pointer-events-none fixed inset-0 z-300 bg-white"
      >
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: EASE.expo }}
          className="absolute inset-x-0 top-0 h-0.5 origin-left bg-brand-500"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE.expo, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
