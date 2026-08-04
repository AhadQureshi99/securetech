import type { Metadata } from "next";
import { Benefits } from "@/components/sections/Benefits";
import { HiringProcess } from "@/components/sections/HiringProcess";
import { PageHeader } from "@/components/sections/PageHeader";
import { Vacancies } from "@/components/sections/Vacancies";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Engineering roles at Secure Tech Consultancy — embedded firmware, platform, Android and programme delivery on biometric identity systems deployed at national scale.",
};

export default function CareersPage() {
  return (
    <>
      <PageHeader
        crumb="Careers"
        title="Work on systems that have to be right."
        lede="Most software fails quietly and gets patched on Monday. Ours verifies a citizen at a polling station, issues a SIM against a thumbprint, or opens a door it should not. That constraint is the job."
      />
      <Benefits />
      <Vacancies />
      <HiringProcess />
    </>
  );
}
