import type { Metadata } from "next";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { Offices } from "@/components/sections/Offices";
import { PageHeader } from "@/components/sections/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the engineering team at Secure Tech Consultancy. Head office in Islamabad, with regional offices in Karachi, Lahore, Multan, Faisalabad, Sukkur and Sahiwal.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumb="Contact"
        title="Start with the constraint you're under."
        lede="Volume, regulator, deadline, or the legacy database everything has to talk to. Tell us the hard part first — it is the part that determines the architecture."
      />
      <ContactPanel />
      <Offices />
    </>
  );
}
