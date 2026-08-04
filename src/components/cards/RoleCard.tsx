"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Discipline } from "@/data/company";

/**
 * Role card.
 *
 * The requested interaction: a deep navy panel wipes in from the left edge
 * while the type inverts to white. It is one transform on a pseudo-panel plus
 * colour transitions — no layout shift, nothing that reflows, and it reads as
 * a deliberate state change rather than a bounce.
 *
 * `group-hover` drives it in CSS instead of React state so there is no
 * re-render per pointer event across a grid of cards.
 */
export function RoleCard({ role }: { role: Discipline }) {
  return (
    <Link
      href="/careers#apply"
      className="group relative isolate block overflow-hidden rounded-lg border border-[var(--hairline)] bg-white p-6 transition-colors duration-400 ease-[var(--ease-expo)] hover:border-ink-900"
    >
      {/* Navy panel, wiping in from the left */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 -translate-x-full bg-ink-900 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0"
      />

      <div className="mb-4 flex items-start justify-between gap-4">
        <span className="font-mono text-label uppercase tracking-[0.13em] text-brand-500 transition-colors duration-400 group-hover:text-brand-300">
          {role.area}
        </span>
        <ArrowUpRight
          className="size-4 shrink-0 text-ink-500 transition-[color,transform] duration-400 ease-[var(--ease-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
          strokeWidth={1.6}
        />
      </div>

      <h3 className="mb-2.5 text-[1.125rem] font-semibold tracking-[-0.016em] text-ink-900 transition-colors duration-400 group-hover:text-white">
        {role.title}
      </h3>

      <p className="mb-5 text-sm text-ink-600 transition-colors duration-400 group-hover:text-white/70">
        {role.body}
      </p>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 border-t border-[var(--hairline)] pt-4 transition-colors duration-400 group-hover:border-white/15">
        {role.meta.map((item) => (
          <span
            key={item}
            className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-500 transition-colors duration-400 group-hover:text-white/55"
          >
            {item}
          </span>
        ))}
      </div>
    </Link>
  );
}
