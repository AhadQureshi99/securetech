import type { Metadata } from "next";
import { CTA } from "@/components/sections/CTA";
import { Metrics } from "@/components/sections/Metrics";
import { PageHeader } from "@/components/sections/PageHeader";
import { Positioning } from "@/components/sections/Positioning";
import { Recognition } from "@/components/sections/Recognition";
import { Sectors } from "@/components/sections/Sectors";
import { Timeline } from "@/components/sections/Timeline";
import { COMPANY_METRICS } from "@/data/company";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Founded in Islamabad in 2008, Secure Tech Consultancy engineers biometric verification and secure documentation systems for governments, telecom operators and banks across Asia and Africa.",
};

export default function CompanyPage() {
  return (
    <>
      <PageHeader
        crumb="Company"
        title="Built in Islamabad. Deployed at national scale."
        lede="Seventeen years of identity engineering — from the first SIM registration terminals to biometrically verified polling, hospital attendance for a provincial government, and consultancy on national ID abroad."
      />
      <Metrics items={COMPANY_METRICS} />
      <Positioning />
      <Timeline />
      <Recognition />
      <Sectors />
      <CTA
        eyebrow="Work with us"
        title="Bring us the programme nobody wants to own."
        body="The ones with a regulator, a deadline and a database that was never designed to be integrated with. That is the work we are built for."
        secondary={{ label: "See the Products", href: "/products" }}
        showDirect
      />
    </>
  );
}
