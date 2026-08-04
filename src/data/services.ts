import { Fingerprint, IdCard, Layers, ShieldCheck, type LucideIcon } from "lucide-react";

export type Service = {
  index: string;
  title: string;
  description: string;
  tags: readonly string[];
  icon: LucideIcon;
};

export const SERVICES: readonly Service[] = [
  {
    index: "01",
    title: "Biometric Verification & Enrolment",
    description:
      "Real-time 1:1 and 1:N verification wired into national databases. Our NADRA-integrated SIM issuance middleware runs the front end, the back end and the CRM handshake as one system.",
    tags: ["1:1 & 1:N", "NADRA integration", "Middleware", "Field enrolment"],
    icon: Fingerprint,
  },
  {
    index: "02",
    title: "Secure Documentation & Smart Cards",
    description:
      "Smart ID cards, RFID credentials and biometric-enabled debit cards — cryptographic personalisation through to issuance and lifecycle management.",
    tags: ["Smart ID", "RFID", "Cryptographic personalisation", "Card production"],
    icon: IdCard,
  },
  {
    index: "03",
    title: "Enterprise Software & Mobility",
    description:
      "Enterprise platforms, Android field applications and backend integration built for environments where connectivity is unreliable and the audit trail is non-negotiable.",
    tags: ["Android", "Backend integration", "OTA device management", "Digital transformation"],
    icon: Layers,
  },
  {
    index: "04",
    title: "Access Control & Attendance",
    description:
      "Facial and fingerprint terminals for personnel and vehicle access control, plus attendance systems deployed across hospitals, public boards and military installations.",
    tags: ["Facial recognition", "Vehicle access", "Time & attendance"],
    icon: ShieldCheck,
  },
];

export const REASONS = [
  {
    title: "Prime contractor on national programmes",
    body: "We have delivered as prime contractor and system integrator — the smart-card personnel and vehicle access system for the Pakistan Army, and the first biometrically verified polling in Pakistan for the Election Commission.",
  },
  {
    title: "We own the hardware and the software",
    body: "The TPS terminal family is designed and developed in-house alongside the middleware it talks to. One accountable team, one integration surface, no vendor triangle when something needs to change.",
  },
  {
    title: "Certified and audited production",
    body: "Our card production arm operates a GSMA SAS-UP accredited facility under ISO 27001:2022 — and we were appointed by the PTA to carry out the technical audit of mobile subscriber data across Pakistan's cellular operators.",
  },
  {
    title: "Present where the deployment is",
    body: "Seven offices from Islamabad to Sukkur, with programme delivery and consultancy across Iraq, Kenya, Sudan and Nigeria. Field support is local, not remote.",
  },
] as const;

export const SECTORS = [
  {
    index: "01",
    title: "Telecommunications",
    body: "Biometric SIM verification and issuance, retailer and device management, OTA platforms and the technical audit of subscriber data.",
  },
  {
    index: "02",
    title: "Government & elections",
    body: "National entitlement and civil registration programmes, e-governance systems and biometric voter verification.",
  },
  {
    index: "03",
    title: "Banking & financial services",
    body: "Biometric verification for account opening and funds disbursement, plus biometric-enabled card payment systems.",
  },
  {
    index: "04",
    title: "Defence",
    body: "Smart-card personnel and vehicle access control for the Pakistan Army, delivered as prime contractor and system integrator.",
  },
  {
    index: "05",
    title: "Healthcare",
    body: "Biometric attendance across district and tehsil hospitals in Punjab, for the Punjab Information Technology Board.",
  },
  {
    index: "06",
    title: "Law & order, retail and manufacturing",
    body: "Facial identification for law-and-order applications, and access control and attendance for distribution and manufacturing operations.",
  },
] as const;
