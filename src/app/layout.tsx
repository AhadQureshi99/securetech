import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.securetech-consultancy.com"),
  title: {
    default: "Secure Tech Consultancy — Biometric Identity & Security Systems",
    template: "%s | Secure Tech Consultancy",
  },
  description:
    "Since 2008, Secure Tech Consultancy has designed and deployed biometric verification, secure documentation and access control systems for governments, telecom operators and financial institutions across Asia and Africa.",
  openGraph: {
    type: "website",
    siteName: "Secure Tech Consultancy",
    locale: "en_GB",
  },
  icons: { icon: "/brand/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#136CB3",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrument.variable} ${plexMono.variable}`}>
      <body className="antialiased">
        <SmoothScrollProvider>
          <a
            href="#main"
            className="absolute left-4 top-[-4rem] z-200 rounded-sm bg-ink-900 px-4 py-3 text-sm text-white transition-[top] duration-300 focus:top-4"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
