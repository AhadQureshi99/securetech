"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/cards/ProductCard";
import { CATEGORIES, PRODUCTS, type ProductCategory } from "@/data/products";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Filter = "all" | ProductCategory;

/**
 * Filterable catalogue.
 *
 * Framer Motion's `layout` does the work here: filtering reflows the grid
 * with a real FLIP transition instead of items teleporting, and the active
 * chip's pill is a single shared `layoutId` that slides between tabs. Counts
 * are derived from the data so they can never drift from what is rendered.
 */
export function ProductCatalogue() {
  const [active, setActive] = useState<Filter>("all");

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["all", PRODUCTS.length]]);
    for (const product of PRODUCTS) {
      map.set(product.category, (map.get(product.category) ?? 0) + 1);
    }
    return map;
  }, []);

  const visible = useMemo(
    () => PRODUCTS.filter((p) => active === "all" || p.category === active),
    [active],
  );

  return (
    <section id="catalogue" className="scroll-mt-24 py-section">
      <div className="container-page">
        <div
          role="tablist"
          aria-label="Filter products"
          className="mb-[clamp(2rem,3.4vw,3rem)] flex flex-wrap gap-2 border-b border-[var(--hairline)] pb-[clamp(1.25rem,2vw,1.75rem)]"
        >
          {CATEGORIES.map((category) => {
            const selected = active === category.id;
            return (
              <button
                key={category.id}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(category.id)}
                className={cn(
                  // `isolate` so the -z-10 pill is trapped in this button's
                  // stacking context and cannot paint behind an ancestor.
                  "relative isolate rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300",
                  selected
                    ? "border-ink-900 text-white"
                    : "border-[var(--hairline-strong)] text-ink-600 hover:border-ink-900 hover:text-ink-900",
                )}
              >
                {selected ? (
                  <motion.span
                    layoutId="filter-pill"
                    transition={{ duration: 0.5, ease: EASE.expo }}
                    className="absolute inset-0 -z-10 rounded-full bg-ink-900"
                  />
                ) : null}
                <span className="relative">{category.label}</span>
                <em className="tnum relative ml-1.5 font-mono text-[0.625rem] not-italic opacity-60">
                  {String(counts.get(category.id) ?? 0).padStart(2, "0")}
                </em>
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          <AnimatePresence mode="popLayout">
            {visible.map((product) => (
              <motion.div
                key={product.slug}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.22 } }}
                transition={{ duration: 0.55, ease: EASE.expo }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-[clamp(1.5rem,2.4vw,2rem)] text-[0.8125rem] text-ink-500">
          Brochures open as PDFs. For specifications, firmware options or a
          configuration quote,{" "}
          <Link href="/contact" className="text-brand-500 hover:underline hover:underline-offset-4">
            speak to the team
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
