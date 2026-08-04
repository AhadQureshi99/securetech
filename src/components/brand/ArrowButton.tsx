"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { DUR, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "invert" | "outlineInvert";

const SHELL: Record<Variant, string> = {
  primary: "bg-brand-500 text-white border-brand-500",
  ghost: "bg-transparent text-ink-900 border-[var(--hairline-strong)]",
  invert: "bg-white text-ink-900 border-white",
  outlineInvert: "bg-transparent text-white border-white/30",
};

/** The colour that sweeps up behind the label on hover. */
const SWEEP: Record<Variant, string> = {
  primary: "bg-ink-900",
  ghost: "bg-ink-900",
  invert: "bg-brand-500",
  outlineInvert: "bg-white",
};

/** Label colour once the sweep has covered the shell. */
const SWEPT_TEXT: Record<Variant, string> = {
  primary: "group-hover:text-white",
  ghost: "group-hover:text-white",
  invert: "group-hover:text-white",
  outlineInvert: "group-hover:text-ink-900",
};

const TILE: Record<Variant, string> = {
  primary: "bg-white/15",
  ghost: "bg-ink-100 group-hover:bg-white/15",
  invert: "bg-ink-100 group-hover:bg-white/20",
  outlineInvert: "bg-white/15 group-hover:bg-ink-900/10",
};

const transition = { duration: 0.5, ease: EASE.expo };

const sweep: Variants = {
  rest: { y: "101%" },
  hover: { y: "0%", transition },
};

/** The arrow that leaves, and the twin that takes its place. */
const arrowOut: Variants = {
  rest: { x: 0, y: 0 },
  hover: { x: "115%", y: "-115%", transition },
};

const arrowIn: Variants = {
  rest: { x: "-115%", y: "115%" },
  hover: { x: 0, y: 0, transition },
};

const lift: Variants = {
  rest: { y: 0 },
  hover: { y: -2, transition: { duration: DUR.base, ease: EASE.expo } },
  tap: { y: 0, scale: 0.985 },
};

type ArrowButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: "default" | "sm";
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Swap the diagonal arrow for a custom glyph (e.g. a download chevron). */
  icon?: ReactNode;
  magnetic?: boolean;
  onClick?: () => void;
};

/**
 * The signature CTA. Three things happen at once on hover: the shell lifts,
 * a fill sweeps up from the bottom edge, and the arrow exits the tile
 * top-right while its twin enters from bottom-left. Framer Motion variants
 * propagate from the root, so all of it stays in one declarative place.
 */
export function ArrowButton({
  children,
  href,
  variant = "primary",
  size = "default",
  className,
  external = false,
  type = "button",
  disabled = false,
  icon,
  // Magnetic attraction reads playful — right for a studio, wrong for a
  // consultancy. Off by default now; still available where it earns a place.
  magnetic = false,
  onClick,
}: ArrowButtonProps) {
  const glyph = icon ?? <ArrowUpRight className="size-3.5" strokeWidth={1.75} />;

  const shell = (
    <motion.span
      initial="rest"
      whileHover={disabled ? undefined : "hover"}
      whileTap={disabled ? undefined : "tap"}
      variants={lift}
      className={cn(
        "group relative isolate inline-flex items-center overflow-hidden rounded-sm border font-medium tracking-[-0.008em]",
        size === "default"
          ? "min-h-11 gap-3.5 py-1.5 pl-4.5 pr-1.5 text-sm"
          : "min-h-9.5 gap-3 py-1 pl-3.5 pr-1 text-[0.8125rem]",
        SHELL[variant],
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      {/* Fill sweep, behind the content */}
      <motion.span
        aria-hidden
        variants={sweep}
        className={cn("absolute inset-0 -z-10", SWEEP[variant])}
      />

      <span className={cn("relative transition-colors duration-500", SWEPT_TEXT[variant])}>
        {children}
      </span>

      <span
        aria-hidden
        className={cn(
          "relative grid place-items-center overflow-hidden rounded-[2px] transition-colors duration-500",
          size === "default" ? "size-8.5" : "size-7",
          TILE[variant],
        )}
      >
        <motion.span variants={arrowOut} className="absolute grid place-items-center">
          {glyph}
        </motion.span>
        <motion.span variants={arrowIn} className="absolute grid place-items-center">
          {glyph}
        </motion.span>
      </span>
    </motion.span>
  );

  const wrapped = magnetic ? (
    <Magnetic strength={0.14} disabled={disabled}>
      {shell}
    </Magnetic>
  ) : (
    shell
  );

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex">
        {wrapped}
      </a>
    ) : (
      <Link href={href} className="inline-flex">
        {wrapped}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className="inline-flex">
      {wrapped}
    </button>
  );
}
