"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowButton } from "@/components/brand/ArrowButton";
import { Logo } from "@/components/brand/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { NAV_LINKS } from "@/data/site";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Condenses once scrolled, then retreats on the way down and returns on the
 * way up. Scroll state comes from Lenis rather than a `scroll` listener so
 * the readout matches the smoothed position the visitor actually sees.
 */
export function Navbar() {
  const lenis = useLenis();
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function apply(scroll: number, velocity: number) {
      setStuck(scroll > 24);
      if (scroll > 420 && velocity > 0.08) setHidden(true);
      else if (velocity < -0.08 || scroll < 200) setHidden(false);
    }

    if (lenis) {
      const onScroll = (e: { scroll: number; velocity: number }) =>
        apply(e.scroll, e.velocity);
      lenis.on("scroll", onScroll);
      return () => lenis.off("scroll", onScroll);
    }

    // Reduced-motion path: Lenis is never created, so fall back to native.
    let last = window.scrollY;
    const onNative = () => {
      const y = window.scrollY;
      apply(y, y - last);
      last = y;
    };
    window.addEventListener("scroll", onNative, { passive: true });
    onNative();
    return () => window.removeEventListener("scroll", onNative);
  }, [lenis]);

  // A menu left open across a navigation would trap scrolling.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!lenis) return;
    if (menuOpen) lenis.stop();
    else lenis.start();
  }, [menuOpen, lenis]);

  function isActive(href: string) {
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href;
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: hidden && !menuOpen ? "-100%" : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.6, ease: EASE.expo }}
        className={cn(
          "fixed inset-x-0 top-0 z-100 flex items-center transition-[height,background-color,border-color,backdrop-filter] duration-500",
          stuck
            ? "h-16 border-b border-[var(--hairline)] bg-white/85 backdrop-blur-xl backdrop-saturate-150"
            : "h-[var(--nav-h)] border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-page flex w-full items-center justify-between gap-6">
          <Logo className={stuck ? "h-6.5" : "h-8"} />

          <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-9">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className="group relative py-1.5 text-sm font-medium tracking-[-0.008em] text-ink-700 transition-colors hover:text-ink-900 aria-[current=page]:text-ink-900"
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-400 ease-[var(--ease-expo)] group-hover:scale-x-100",
                    isActive(link.href) ? "scale-x-100 bg-verify-500" : "bg-brand-500",
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <ArrowButton href="/contact" size="sm">
                Talk to Us
              </ArrowButton>
            </div>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="grid size-11 place-items-center rounded-sm border border-[var(--hairline-strong)] lg:hidden"
            >
              <span className="relative block h-[11px] w-[17px]">
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE.expo }}
                  className="absolute inset-x-0 top-0 block h-[1.5px] bg-ink-900"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-x-0 top-[5px] block h-[1.5px] bg-ink-900"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE.expo }}
                  className="absolute inset-x-0 bottom-0 block h-[1.5px] bg-ink-900"
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen ? <MobileMenu onClose={() => setMenuOpen(false)} /> : null}
      </AnimatePresence>
    </>
  );
}
