import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Wordmark. `invert` knocks the supplied PNG to white for dark surfaces —
 * a stopgap until a vector logo is supplied (see README).
 */
export function Logo({
  className,
  invert = false,
  href = "/",
}: {
  className?: string;
  invert?: boolean;
  href?: string | null;
}) {
  const img = (
    <Image
      src="/brand/logo.png"
      alt="Secure Tech Consultancy"
      width={211}
      height={39}
      priority
      className={cn(
        "h-8 w-auto transition-[height] duration-500",
        invert && "brightness-0 invert opacity-90",
        className,
      )}
    />
  );

  if (!href) return img;

  return (
    <Link href={href} aria-label="Secure Tech Consultancy — home" className="inline-flex">
      {img}
    </Link>
  );
}
