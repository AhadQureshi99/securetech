"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Pip } from "@/components/brand/Pip";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { CERTIFICATIONS, SITE } from "@/data/site";

const COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Our record", href: "/company#timeline" },
      { label: "Customers", href: "/company#clients" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Biometric verification", href: "/#capabilities" },
      { label: "Smart cards & documentation", href: "/#capabilities" },
      { label: "Enterprise software", href: "/#capabilities" },
      { label: "Access control", href: "/#capabilities" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "TPS terminals", href: "/products" },
      { label: "Facial recognition", href: "/products" },
      { label: "Software platforms", href: "/products" },
      { label: "Full catalogue", href: "/products" },
    ],
  },
];

export function Footer() {
  const lenis = useLenis();

  function toTop() {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0 });
  }

  return (
    <footer className="bg-ink-900 pt-[clamp(3.5rem,6vw,5.5rem)] text-sm text-white/65">
      <div className="container-page">
        <div className="grid gap-x-6 gap-y-10 pb-[clamp(2.5rem,4.5vw,4rem)] lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo invert href={null} className="mb-5 h-8" />
            <p className="mb-6 max-w-[26em]">
              Secure Tech Consultancy (Pvt) Ltd is an IT consulting and systems
              integration firm specialising in biometric verification, secure
              documentation and identity management for governments and large
              organisations.
            </p>
            <div className="flex flex-wrap gap-2">
              {CERTIFICATIONS.map((cert) => (
                <span
                  key={cert.title}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/16 px-2.5 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-white/75"
                >
                  <Pip />
                  {cert.title}
                </span>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading} className="sm:col-span-1 lg:col-span-2 lg:col-start-auto">
              <h3 className="mb-4.5 font-mono text-label font-medium uppercase tracking-[0.14em] text-white/58">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <h3 className="mb-4.5 font-mono text-label font-medium uppercase tracking-[0.14em] text-white/58">
              Contact
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a href={SITE.switchboardHref} className="transition-colors hover:text-white">
                  +92-51-111-111-STC
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-white">
                  Email us
                </a>
              </li>
              <li>
                <Link href="/contact#offices" className="transition-colors hover:text-white">
                  All seven offices
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Send a message
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/13 py-5.5 text-[0.8125rem] text-white/55 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <nav aria-label="Footer" className="flex items-center gap-5">
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
            <Link href="/careers" className="hover:text-white">
              Careers
            </Link>
            <button
              type="button"
              onClick={toTop}
              className="group inline-flex items-center gap-2 font-mono text-label uppercase tracking-[0.13em] hover:text-white"
            >
              Back to top
              <ArrowUp className="size-3 transition-transform duration-400 ease-[var(--ease-expo)] group-hover:-translate-y-1" />
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
}
