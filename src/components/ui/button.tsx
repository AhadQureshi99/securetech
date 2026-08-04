import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * shadcn/ui-shaped primitive, restyled onto the Secure Tech tokens.
 * Radii stay small (2–4px): sharp corners read as engineered, and pill
 * buttons would fight the technical register of the mono labels.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium tracking-[-0.008em] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-brand-500 text-white hover:bg-ink-900",
        ghost:
          "border border-[var(--hairline-strong)] text-ink-900 hover:border-ink-900 hover:bg-ink-50",
        invert: "bg-white text-ink-900 hover:bg-brand-50",
        outlineInvert:
          "border border-white/30 text-white hover:border-white hover:bg-white hover:text-ink-900",
        link: "text-brand-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4",
        sm: "h-9 px-3.5 text-[0.8125rem]",
        lg: "h-12 px-5",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
