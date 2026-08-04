import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "brand" | "muted" | "invert" | "onBrand";

const TONE: Record<Tone, string> = {
  brand: "text-brand-500",
  muted: "text-ink-500",
  invert: "text-brand-300",
  onBrand: "text-white/85",
};

/**
 * The mono eyebrow. Carries the section index and a hairline rule — the
 * machine-readable register that separates this from a generic landing page.
 */
export function Eyebrow({
  children,
  index,
  tone = "brand",
  className,
}: {
  children: ReactNode;
  /** Two-digit section number, e.g. "01". */
  index?: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p className={cn("label", TONE[tone], className)}>
      {index ? (
        <span className={cn("tnum", tone === "invert" || tone === "onBrand" ? "text-white/45" : "text-ink-500")}>
          {index}
        </span>
      ) : null}
      <span className="label-rule" />
      <span>{children}</span>
    </p>
  );
}
