import { Hero } from "@/components/sections/Hero";
import { CTA } from "@/components/sections/CTA";
import { TrustMarquee } from "@/components/sections/TrustMarquee";
import { Services } from "@/components/sections/Services";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { FactoryShowcase } from "@/components/sections/FactoryShowcase";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Moved directly beneath the hero on request: the page states the
          proposition, then immediately offers the next step. */}
      <CTA
        title="Let's scope your identity programme."
        body="Tell us what you need to verify, at what volume, and under which regulator. We will come back with an architecture, a device recommendation and a delivery plan — not a brochure."
        secondary={{ label: "See the catalogue", href: "/products" }}
        showDirect
      />

      <TrustMarquee />
      <Services />
      <FeaturedProducts />
      <FactoryShowcase />
      <WhyChooseUs />
    </>
  );
}
