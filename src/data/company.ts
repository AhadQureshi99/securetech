export const TIMELINE = [
  {
    year: "2009",
    title: "Operations begin in Islamabad",
    body: "Founded on the premise of helping organisations solve business challenges using technology.",
  },
  {
    year: "2011",
    title: "Iraq & the Pakistan Army",
    body: "Enrolment software and system integration for Iraq's National Entitlement Program, and a smartcard-based ID system for the Pakistan Army.",
  },
  {
    year: "2012",
    title: "Kenya — IPRS consultancy",
    body: "Consultancy for the Integrated Population Registration System, Ministry of State for Immigration and Registration of Persons.",
  },
  {
    year: "2013",
    title: "Sudan, and biometrics for Jazz",
    body: "Consultancy on the Sudan Civil Registration System, and design and implementation of the biometric verification system for Jazz.",
  },
  {
    year: "2014",
    title: "IDEAS Karachi & device production",
    body: "Exhibited at the IDEAS Expo in Karachi while Jazz biometric devices moved into production at our head office.",
  },
  {
    year: "2015",
    title: "PITB hospital attendance",
    body: "Biometric attendance system for the Punjab Information Technology Board, deployed across district and tehsil hospitals in Punjab.",
  },
  {
    year: "2016",
    title: "PTA technical audit",
    body: "Awarded the technical audit of mobile subscriber data for cellular mobile operators across Pakistan.",
  },
  {
    year: "2017",
    title: "First biometrically verified polling",
    body: "Delivered the NA-120 bye-election pilot in Lahore for the Election Commission of Pakistan, and won Jazz's Best Supplier Award.",
  },
  {
    year: "2018",
    title: "ID4Africa, Abuja",
    body: "Exhibited at the ID4Africa annual exhibition in Abuja, Nigeria — a second consecutive year on the continent's identity stage.",
  },
  {
    year: "2020",
    title: "Secure Tech Towers",
    body: "Ground-breaking ceremony for the purpose-built head office in Sector I-9/3, Islamabad.",
  },
] as const;

export const COMPANY_METRICS = [
  { value: 17, label: "Years in operation" },
  { value: 7, label: "Offices across Pakistan" },
  { value: 4, label: "Countries of programme delivery" },
  { value: 5, label: "National & international awards" },
] as const;

export type Office = {
  id: string;
  city: string;
  tag: string;
  role: string;
  isHq?: boolean;
  lines: readonly string[];
  phone: string;
  phoneHref: string;
  coverage: string;
};

export const OFFICES: readonly Office[] = [
  {
    id: "islamabad",
    city: "Islamabad",
    tag: "HQ",
    role: "Head office",
    isHq: true,
    lines: [
      "Secure Tech Consultancy (Pvt) Ltd",
      "Plot 391, Potohar Road, Sector I-9/3",
      "Islamabad, Pakistan",
    ],
    phone: "+92-301-8540347",
    phoneHref: "tel:+923018540347",
    coverage: "Engineering, production, programme delivery",
  },
  {
    id: "karachi",
    city: "Karachi",
    tag: "02",
    role: "Regional office",
    lines: [
      "Secure Tech Consultancy (Private) Limited",
      "2nd Floor, Building 106-C, 11th Commercial Street",
      "Facing Khayaban-e-Ittehad, DHA Phase-2 Extension",
      "Karachi, Pakistan",
    ],
    phone: "+92-305-5553775",
    phoneHref: "tel:+923055553775",
    coverage: "Sindh — telecom, banking and port operations",
  },
  {
    id: "lahore",
    city: "Lahore",
    tag: "03",
    role: "Regional office",
    lines: [
      "Secure Tech Consultancy (Private) Limited",
      "2nd Floor, Bridgestone Building, 1/13 Lake Road",
      "Near PSO Pump Chowk, Jain Mandir",
      "Lahore, Pakistan",
    ],
    phone: "+92-300-0562145",
    phoneHref: "tel:+923000562145",
    coverage: "Central Punjab — public sector and healthcare",
  },
  {
    id: "multan",
    city: "Multan",
    tag: "04",
    role: "Regional office",
    lines: [
      "Secure Tech Consultancy (Private) Limited",
      "Office 104, Zoom Square Center",
      "Near Gulistan Chowk, Masoom Shah Road",
      "Multan, Pakistan",
    ],
    phone: "+92-301-8514412",
    phoneHref: "tel:+923018514412",
    coverage: "South Punjab — retail and agent networks",
  },
  {
    id: "faisalabad",
    city: "Faisalabad",
    tag: "05",
    role: "Regional office",
    lines: [
      "Secure Tech Consultancy (Private) Limited",
      "2nd Floor, 63-P, Chenab Market",
      "Susan Road, Madina Town",
      "Faisalabad, Pakistan",
    ],
    phone: "+92-300-0562161",
    phoneHref: "tel:+923000562161",
    coverage: "Industrial belt — attendance and access control",
  },
  {
    id: "sukkur",
    city: "Sukkur",
    tag: "06",
    role: "Regional office",
    lines: [
      "Secure Tech Consultancy (Private) Limited",
      "Office 550, M/1/3, Al Amin Tower, Mezzanine Floor",
      "Opposite Shalimar Plaza, near UBL, Minara Road",
      "Sukkur, Pakistan",
    ],
    phone: "+92-300-0562163",
    phoneHref: "tel:+923000562163",
    coverage: "Upper Sindh — field verification support",
  },
  {
    id: "sahiwal",
    city: "Sahiwal",
    tag: "07",
    role: "Regional office",
    lines: [
      "Secure Tech Consultancy (Private) Limited",
      "Office 294, Hussaini Chowk",
      "Near Decent Bakery, High Street",
      "Sahiwal, Pakistan",
    ],
    phone: "+92-300-0723422",
    phoneHref: "tel:+923000723422",
    coverage: "Sahiwal division — retailer and device support",
  },
];

export const BENEFITS = [
  {
    title: "National-scale problems",
    body: "Programmes for regulators, election commissions, armed forces and mobile operators — measured in millions of verifications, not sprint points.",
    icon: "globe",
  },
  {
    title: "The whole stack, genuinely",
    body: "Firmware on the terminal, middleware in the datacentre, the Android app in the field, the integration with the national database. Nobody here is boxed into one layer.",
    icon: "layers",
  },
  {
    title: "Certified process discipline",
    body: "Working inside a GSMA SAS-UP accredited, ISO 27001:2022 environment teaches security engineering habits that transfer for the rest of your career.",
    icon: "shield",
  },
  {
    title: "People stay",
    body: "Long tenures are the norm, which means you learn from engineers who have carried systems from specification through to a decade of production.",
    icon: "users",
  },
  {
    title: "International deployment",
    body: "Our consultancy and delivery record spans Iraq, Kenya and Sudan, with exhibition and advisory work across Africa. Field exposure is real, not theoretical.",
    icon: "plane",
  },
  {
    title: "Seven offices",
    body: "Islamabad, Karachi, Lahore, Multan, Faisalabad, Sukkur and Sahiwal — so a career here does not have to mean relocating.",
    icon: "pin",
  },
] as const;

export type Discipline = {
  area: string;
  title: string;
  body: string;
  meta: readonly string[];
};

/**
 * Disciplines the company recruits into — deliberately NOT job postings.
 *
 * The live careers page lists no open positions, and inventing named
 * vacancies for a real employer would send real applicants after roles that
 * do not exist. These describe the standing shape of the team instead, and
 * every card routes to the open application.
 *
 * When roles do open, add them to `VACANCIES` below and the section swaps to
 * real postings automatically.
 */
export const DISCIPLINES: readonly Discipline[] = [
  {
    area: "Embedded",
    title: "Firmware & device engineering",
    body: "Capture firmware on the TPS terminals — sensors, secure element, power, and the field conditions none of it was tested for.",
    meta: ["Islamabad", "On-site", "Mid–Senior"],
  },
  {
    area: "Platform",
    title: "Backend & integration",
    body: "The middleware between a terminal in a shop and a national database, with the audit trail a regulator will eventually ask for.",
    meta: ["Islamabad", "Hybrid", "Mid–Senior"],
  },
  {
    area: "Mobile",
    title: "Android field applications",
    body: "Verification, disbursement and enrolment apps built for intermittent connectivity and shared devices.",
    meta: ["Islamabad", "Hybrid", "All levels"],
  },
  {
    area: "Delivery",
    title: "Programme management",
    body: "Owning a national deployment end to end — the contract, the rollout, the regulator and the people in the field.",
    meta: ["Islamabad · Karachi", "Travel", "Senior"],
  },
  {
    area: "Assurance",
    title: "Quality & information security",
    body: "Holding GSMA SAS-UP and ISO 27001:2022 in a plant that ships every day, not just at audit time.",
    meta: ["Islamabad", "On-site", "Mid–Senior"],
  },
  {
    area: "Field",
    title: "Deployment & support",
    body: "Standing up terminal estates across seven offices, and keeping them running once the launch team has gone home.",
    meta: ["Nationwide", "On-site", "All levels"],
  },
];

/** Live postings. Empty by design — see DISCIPLINES above. */
export const VACANCIES: readonly Discipline[] = [];

export const HIRING_STEPS = [
  {
    index: "01",
    title: "Application review",
    body: "A member of the engineering or programme team reads it — not a keyword filter. Expect a response within two weeks.",
  },
  {
    index: "02",
    title: "Technical conversation",
    body: "Sixty minutes on what you have actually built, and how you reason about failure. Bring a system you know well.",
  },
  {
    index: "03",
    title: "Working session",
    body: "A scoped problem drawn from real programme work, walked through together. Paid if it runs beyond a half day.",
  },
  {
    index: "04",
    title: "Offer and onboarding",
    body: "Terms, start date and the security clearances your programme requires. Onboarding pairs you with a long-tenure engineer.",
  },
] as const;
