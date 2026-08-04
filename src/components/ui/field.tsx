"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

const control =
  "w-full rounded-sm border border-[var(--hairline-strong)] bg-white px-3.5 py-3 text-sm text-ink-900 outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-ink-500 focus:border-brand-500 focus:ring-3 focus:ring-brand-500/12 aria-[invalid=true]:border-[#c0392b]";

export function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-mono text-label uppercase tracking-[0.13em] text-ink-500"
    >
      {children}
    </label>
  );
}

/** Error text that slides in rather than snapping the layout. */
export function FieldError({ children }: { children?: string }) {
  return (
    <AnimatePresence initial={false}>
      {children ? (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: EASE.expo }}
          className="overflow-hidden text-[0.8125rem] text-[#c0392b]"
        >
          {children}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

export function Field({
  label,
  id,
  error,
  children,
  className,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {children}
      <FieldError>{error}</FieldError>
    </div>
  );
}

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn(control, className)} {...props} />;
  },
);

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea ref={ref} className={cn(control, "min-h-34 resize-y", className)} {...props} />
  );
});

export const Select = React.forwardRef<HTMLSelectElement, React.ComponentProps<"select">>(
  function Select({ className, children, ...props }, ref) {
    return (
      <select ref={ref} className={cn(control, "appearance-none", className)} {...props}>
        {children}
      </select>
    );
  },
);
