import type { ReactNode } from "react";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { cn } from "@/lib/utils";

/**
 * The standard section opener: mono eyebrow, masked headline, and an optional
 * lede sitting in the right-hand column. Keeping it in one component is what
 * makes the vertical rhythm identical on every page.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  aside,
  tone = "light",
  className,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
  tone?: "light" | "dark" | "brand";
  className?: string;
}) {
  const eyebrowTone = tone === "dark" ? "invert" : tone === "brand" ? "onBrand" : "brand";

  return (
    <div
      className={cn(
        "mb-[clamp(2.5rem,4.5vw,4.5rem)] grid items-end gap-x-7 gap-y-6 lg:grid-cols-12",
        className,
      )}
    >
      <div className="lg:col-span-7">
        <Reveal className="mb-[clamp(1rem,1.8vw,1.5rem)]">
          <Eyebrow index={index} tone={eyebrowTone}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
        <SplitReveal
          as="h2"
          className={cn(
            "text-display-lg",
            tone === "light" ? "text-ink-900" : "text-white",
          )}
        >
          {title}
        </SplitReveal>
      </div>

      {lede || aside ? (
        <div className="lg:col-span-4 lg:col-start-9 lg:pb-1.5">
          {lede ? (
            <Reveal delay={0.12}>
              <p
                className={cn(
                  "lede",
                  tone === "light"
                    ? "text-ink-600"
                    : tone === "brand"
                      ? "text-white/78"
                      : "text-white/66",
                )}
              >
                {lede}
              </p>
            </Reveal>
          ) : null}
          {aside}
        </div>
      ) : null}
    </div>
  );
}
