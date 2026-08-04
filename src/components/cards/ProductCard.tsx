"use client";

import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Pip } from "@/components/brand/Pip";
import type { Product } from "@/data/products";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const card: Variants = {
  rest: { y: 0 },
  hover: { y: -6, transition: { duration: 0.5, ease: EASE.expo } },
};

const media: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.055, transition: { duration: 0.8, ease: EASE.expo } },
};

const tileArrow: Variants = {
  rest: { x: 0, y: 0 },
  hover: { x: 2, y: -2, transition: { duration: 0.45, ease: EASE.expo } },
};

/**
 * One card, two surfaces. On the dark Featured row it sits on a translucent
 * white wash with a blue glow behind the device; on the light Products page
 * it becomes a bordered white card with a soft shadow on hover.
 */
export function ProductCard({
  product,
  tone = "light",
  compact = false,
  className,
}: {
  product: Product;
  tone?: "light" | "dark";
  /** Shorter media well, for the pinned rail where the card must fit the fold. */
  compact?: boolean;
  className?: string;
}) {
  const dark = tone === "dark";
  const href = product.brochure ?? "/contact";
  const isBrochure = Boolean(product.brochure);

  return (
    <motion.article
      id={product.slug}
      initial="rest"
      whileHover="hover"
      variants={card}
      className={cn(
        "group relative flex scroll-mt-28 flex-col overflow-hidden rounded-md border transition-colors duration-500",
        dark
          ? "border-white/12 bg-white/[0.025] hover:border-brand-400 hover:bg-white/[0.055]"
          : "border-[var(--hairline)] bg-white hover:border-brand-300 hover:shadow-[0_24px_48px_-32px_rgba(10,22,38,0.28)]",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden border-b",
          compact ? "aspect-16/10" : "aspect-4/3",
          dark ? "border-white/12" : "border-[var(--hairline)] bg-ink-50",
        )}
      >
        {/* Glow behind device shots; scrim under photographs */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-0",
            product.photo
              ? "bg-gradient-to-t from-ink-950/45 to-transparent"
              : dark
                ? "bg-[radial-gradient(50%_50%_at_50%_55%,rgba(19,108,179,0.34),transparent_70%)]"
                : "bg-[radial-gradient(50%_50%_at_50%_55%,rgba(19,108,179,0.10),transparent_72%)]",
          )}
        />

        {/*
          The frame owns the aspect; this layer owns the box. Absolute inset-0
          gives the image a *definite* height to resolve against — a normal-flow
          child cannot, because an auto-height track always grows to its
          content, which is how the portrait TPS 950 (996×2011) and the squarer
          TPS 550s ended up taller than their wells and cropped by the overflow
          rule above. Padding lives here so it insets the device rather than the
          frame.
        */}
        <motion.div
          variants={media}
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            product.photo
              ? "p-0"
              : compact
                ? "p-[clamp(1rem,2vw,1.75rem)]"
                : "p-[clamp(1.5rem,3vw,2.5rem)]",
          )}
        >
          <Image
            src={product.image}
            alt={product.name}
            width={product.width}
            height={product.height}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            className={cn(
              product.photo
                ? "size-full object-cover saturate-[0.85] contrast-[1.04]"
                : // Capped by the well in both axes, so a tall shot shrinks to
                  // fit instead of overflowing it.
                  "max-h-full max-w-full object-contain",
            )}
          />
        </motion.div>
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col gap-2.5",
          compact ? "p-[clamp(1rem,1.5vw,1.375rem)]" : "p-[clamp(1.125rem,1.9vw,1.625rem)]",
        )}
      >
        <p
          className={cn(
            "font-mono text-label uppercase tracking-[0.14em]",
            dark ? "text-brand-300" : "text-brand-500",
          )}
        >
          {product.categoryLabel}
        </p>

        <h3
          className={cn(
            "text-[clamp(1.0625rem,1.35vw,1.3125rem)] font-semibold leading-[1.25] tracking-[-0.014em]",
            dark ? "text-white" : "text-ink-900",
          )}
        >
          {product.name}
        </h3>

        <p className={cn("flex-1 text-sm", dark ? "text-white/66" : "text-ink-600")}>
          {product.description}
        </p>

        <div className="mt-1.5 flex items-center justify-between gap-4">
          <span
            className={cn(
              "flex items-center gap-1.5 font-mono text-label uppercase tracking-[0.1em]",
              dark ? "text-white/55" : "text-ink-500",
            )}
          >
            {product.verified ? <Pip /> : null}
            {product.spec}
          </span>

          <motion.a
            href={href}
            {...(isBrochure
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            aria-label={
              isBrochure
                ? `Download the ${product.name} brochure (PDF)`
                : `Enquire about ${product.name}`
            }
            variants={tileArrow}
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded-[2px] border transition-colors duration-500",
              dark
                ? "border-white/12 text-white/70 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white"
                : "border-[var(--hairline)] text-ink-500 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white",
            )}
          >
            {isBrochure ? (
              <Download className="size-3.5" strokeWidth={1.6} />
            ) : (
              <ArrowUpRight className="size-3.5" strokeWidth={1.6} />
            )}
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}
