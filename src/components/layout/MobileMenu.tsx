"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { NAV_LINKS, SITE } from "@/data/site";
import { EASE } from "@/lib/motion";

const sheet = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.7, ease: EASE.expo },
  },
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 0.5, ease: EASE.inOut },
  },
};

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.14 } },
  exit: {},
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE.expo } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export function MobileMenu({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      variants={sheet}
      initial="hidden"
      animate="show"
      exit="exit"
      className="fixed inset-0 z-99 flex flex-col justify-between overflow-y-auto bg-white px-gutter pb-10 pt-[calc(var(--nav-h)+2.5rem)] lg:hidden"
    >
      <motion.nav
        variants={list}
        initial="hidden"
        animate="show"
        exit="exit"
        aria-label="Mobile"
        className="flex flex-col"
      >
        {NAV_LINKS.map((link, i) => (
          <motion.div key={link.href} variants={item}>
            <Link
              href={link.href}
              onClick={onClose}
              className="flex items-baseline justify-between gap-4 border-t border-[var(--hairline)] py-4 text-[clamp(1.5rem,7vw,2rem)] font-medium tracking-[-0.028em] last:border-b"
            >
              {link.label}
              <span className="font-mono text-label tracking-[0.14em] text-ink-500">
                {String(i + 1).padStart(2, "0")}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.nav>

      <motion.div variants={item} initial="hidden" animate="show" exit="exit" className="mt-10">
        <p className="label mb-2 text-ink-500">
          <span className="label-rule" />
          Head office
        </p>
        <a href={SITE.switchboardHref} className="block text-sm text-ink-600 hover:text-brand-500">
          {SITE.switchboard}
        </a>
        <a href={`mailto:${SITE.email}`} className="block text-sm text-ink-600 hover:text-brand-500">
          {SITE.email}
        </a>
      </motion.div>
    </motion.div>
  );
}
