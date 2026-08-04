export const SITE = {
  name: "Secure Tech Consultancy",
  legalName: "Secure Tech Consultancy (Private) Limited",
  shortName: "Secure Tech",
  established: 2008,
  switchboard: "+92-51-111-111-STC (782)",
  switchboardHref: "tel:+925111111782",
  fax: "+92-51-4436480",
  // TODO: confirm the live public mailbox before launch — the current site
  // renders its addresses as obfuscated images.
  email: "info@securetech-consultancy.com",
  careersEmail: "careers@securetech-consultancy.com",
  headOffice: {
    lines: [
      "Secure Tech Consultancy (Pvt) Ltd",
      "Plot 391, Potohar Road, Sector I-9/3",
      "Islamabad, Pakistan",
    ],
    short: "Secure Tech Towers, I-9/3, Islamabad",
  },
  hours: "Monday – Saturday, 09:00 – 18:00 PKT",
  sisterSite: "https://www.securetech-cards.com/",
} as const;

export const NAV_LINKS = [
  { label: "Solutions", href: "/#capabilities" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Company", href: "/company" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const CERTIFICATIONS = [
  {
    title: "GSMA SAS-UP",
    detail: "Security Accreditation Scheme — UICC Production",
  },
  {
    title: "ISO/IEC 27001:2022",
    detail: "Information security management system",
  },
] as const;

export const AWARDS = [
  "Listed in the Global Top 50 suppliers of the Auto-ID industry",
  "Star of Excellence Award — Government of Pakistan",
  "ID Outstanding Achievement Award for Secure Documentation, Rome",
  "Lifetime Achievement Award — NCR Corporation",
  "Best Supplier Award, Indirect Category — Jazz Supplier Day, 2017",
] as const;

export const HERO_STATS = [
  { value: 2008, label: "Year established", animate: false },
  { value: 50, prefix: "Top ", label: "Global Auto-ID suppliers", animate: true },
  { value: 7, label: "Offices across Pakistan", animate: true },
  { value: 20, suffix: "+", label: "Government & enterprise clients", animate: true },
] as const;
