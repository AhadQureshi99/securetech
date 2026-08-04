"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Pointer attraction. Framer Motion rather than GSAP because this is
 * interaction state, not scroll position — springs read more alive here than
 * a tween would, and `useSpring` keeps the return-to-rest physical.
 *
 * Kept subtle: a few pixels. Anything more and buttons start feeling evasive
 * rather than responsive.
 */
export function Magnetic({
  children,
  className,
  strength = 0.18,
  disabled = false,
}: {
  children: ReactNode;
  className?: string;
  /** Fraction of the pointer's offset from centre that is followed. */
  strength?: number;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const x = useSpring(mx, { stiffness: 260, damping: 26, mass: 0.6 });
  const y = useSpring(my, { stiffness: 260, damping: 26, mass: 0.6 });

  // A touch of counter-rotation sells depth without a 3D transform.
  const rotate = useTransform(x, [-40, 40], [-1.4, 1.4]);

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    my.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x, y, rotate }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}
