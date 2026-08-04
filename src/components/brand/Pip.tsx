import { cn } from "@/lib/utils";

/**
 * The verification signal. This is the *only* place green is allowed to
 * appear as a solid fill — beside something that has actually been verified,
 * certified or matched. The pulsing ring is CSS so it costs nothing.
 */
export function Pip({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-block size-[7px] shrink-0 rounded-full bg-verify-500",
        "after:absolute after:-inset-[5px] after:rounded-full after:border after:border-verify-500 after:opacity-0 after:content-['']",
        "after:animate-[pip_2.8s_cubic-bezier(0.16,1,0.3,1)_infinite]",
        className,
      )}
    />
  );
}
