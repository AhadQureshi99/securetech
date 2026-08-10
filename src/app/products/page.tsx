import type { Metadata } from "next";
import { CardFactorySolution } from "@/components/sections/CardFactorySolution";
import { CTA } from "@/components/sections/CTA";
import { ProductRails } from "@/components/sections/ProductRails";
import { ProductsHero } from "@/components/sections/ProductsHero";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The full Secure Tech catalogue: the TPS family of handheld biometric terminals and facial recognition devices, the software platforms behind them, and the group's card factory solution.",
};

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <ProductRails />
      <CardFactorySolution />
      <CTA
        eyebrow="Specification"
        title="Need a device configured to your programme?"
        body="Because we build the terminals and the middleware, the firmware, the capture standard and the integration can all be shaped around your requirement rather than around a datasheet."
        primary={{ label: "Request a Specification", href: "/contact" }}
      />
    </>
  );
}
