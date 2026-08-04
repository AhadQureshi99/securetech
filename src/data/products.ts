export type ProductCategory = "terminals" | "facial" | "platforms";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  description: string;
  spec: string;
  /** Short copy for the homepage rail, shown in full — see SHOWCASE_ORDER. */
  tagline?: string;
  /** Show the verification pip beside the spec. */
  verified?: boolean;
  image: string;
  /**
   * The image's true intrinsic size, read off the file rather than assumed.
   *
   * These vary wildly — the terminals are 528×374, the TPS 470 is 1000×677 and
   * the TPS 950 is portrait at 996×2011. Declaring one fixed ratio for all of
   * them (the previous behaviour) made next/image reserve the wrong box, which
   * both shifted layout on load and letterboxed each device to a different
   * apparent size. Frames are shaped in CSS; the image keeps its own ratio.
   */
  width: number;
  height: number;
  /** Photographic imagery fills the frame; device shots float on a plinth. */
  photo?: boolean;
  brochure?: string;
  featured?: boolean;
};

const BROCHURE = "https://www.securetech-consultancy.com/assets/pdf";

export const CATEGORIES: { id: "all" | ProductCategory; label: string }[] = [
  { id: "all", label: "All products" },
  { id: "terminals", label: "Handheld terminals" },
  { id: "facial", label: "Facial recognition" },
  { id: "platforms", label: "Software platforms" },
];

export const PRODUCTS: readonly Product[] = [
  {
    slug: "tps-470",
    name: "TPS 470",
    category: "terminals",
    categoryLabel: "Handheld terminal",
    description:
      "A versatile handheld biometric tablet designed and developed exclusively by Secure Tech Consultancy — the largest display in the family, built for high-volume field enrolment.",
    tagline:
      "The largest display in the family, built for high-volume field enrolment.",
    spec: "Enrolment grade",
    verified: true,
    image: "/images/products/tps-470.png",
    width: 1000,
    height: 677,
    brochure: `${BROCHURE}/TPS-470.pdf`,
    featured: true,
  },
  {
    slug: "tps-360c",
    name: "TPS 360c",
    category: "terminals",
    categoryLabel: "Handheld terminal",
    description:
      "Captures the customer's fingerprint impression and carries out 1:1 verification against the national database using the computerised National ID Card.",
    tagline:
      "1:1 fingerprint verification against the national database, using the CNIC.",
    spec: "1:1 · CNIC",
    image: "/images/products/tps-360c.png",
    width: 528,
    height: 374,
    brochure: `${BROCHURE}/TPS360-C.pdf`,
  },
  {
    slug: "tps-900",
    name: "TPS 900",
    category: "terminals",
    categoryLabel: "Handheld terminal",
    description:
      "Handheld fingerprint capture with 1:1 verification against the national database — the workhorse configuration for retail and agent networks.",
    tagline:
      "Handheld fingerprint capture with 1:1 verification against the national database.",
    spec: "1:1 · CNIC",
    image: "/images/products/tps-900.png",
    width: 528,
    height: 374,
    brochure: `${BROCHURE}/TPS900.pdf`,
  },
  {
    slug: "tps-550s",
    name: "TPS 550s",
    category: "terminals",
    categoryLabel: "Handheld terminal",
    description:
      "Fingerprint capture with an integrated camera, so the operator can acquire the subject's photograph in the same transaction as the biometric.",
    tagline:
      "Fingerprint capture with an integrated camera — biometric and photograph in one transaction.",
    spec: "Fingerprint + camera",
    image: "/images/products/tps-550s.png",
    width: 1030,
    height: 921,
    brochure: `${BROCHURE}/TPS-550.pdf`,
    featured: true,
  },
  {
    slug: "tps-550",
    name: "TPS 550",
    category: "terminals",
    categoryLabel: "Handheld terminal",
    description:
      "A compact handheld fingerprint solution designed and developed exclusively by Secure Tech Consultancy for high-throughput verification points.",
    spec: "Compact form factor",
    image: "/images/products/tps-550.png",
    width: 528,
    height: 374,
    brochure: `${BROCHURE}/TPS550.pdf`,
  },
  {
    slug: "tps-350",
    name: "TPS 350",
    category: "terminals",
    categoryLabel: "Handheld terminal",
    description:
      "The entry point to the TPS family — a handheld fingerprint verification solution for distributed agent and retailer deployments.",
    tagline:
      "Entry-point handheld verification for distributed agent and retailer networks.",
    spec: "Agent network",
    image: "/images/products/tps-350.png",
    width: 528,
    height: 374,
    brochure: `${BROCHURE}/TPS350.pdf`,
  },
  {
    slug: "tps-980",
    name: "TPS 980",
    category: "facial",
    categoryLabel: "Facial recognition",
    description:
      "Identifies an individual against a stored gallery of 1,000 facial templates. Deployed for access control, attendance, mobile financial services and law-and-order applications.",
    tagline:
      "Identifies an individual against a stored gallery of 1,000 facial templates.",
    spec: "1:N gallery · 1,000",
    image: "/images/products/tps-980.png",
    width: 528,
    height: 374,
    brochure: `${BROCHURE}/TPS980.pdf`,
    featured: true,
  },
  {
    slug: "tps-950",
    name: "TPS 950",
    category: "facial",
    categoryLabel: "Facial recognition",
    description:
      "Facial recognition with configurable second factors — a PIN for 1:1 identification, or an RFID-enabled ID card where the programme requires a physical credential.",
    spec: "Face + PIN / RFID",
    image: "/images/products/tps-950.png",
    width: 996,
    height: 2011,
    brochure: `${BROCHURE}/TPS950.pdf`,
  },
  {
    slug: "sim-issuance",
    name: "Biometric SIM Issuance System",
    category: "platforms",
    categoryLabel: "Software platform",
    description:
      "A turnkey solution for biometric SIM verification and issuance: the front end, the backend middleware, NADRA integration and the CRM handshake for real-time verification.",
    spec: "Retailer & device mgmt",
    verified: true,
    image: "/images/solutions/sim-issuance.jpg",
    width: 1500,
    height: 875,
    photo: true,
  },
  {
    slug: "attendance",
    name: "Biometric Time & Attendance",
    category: "platforms",
    categoryLabel: "Software platform",
    description:
      "Automates employee time and attendance tracking from small offices to large enterprises, pairing the attendance software with fingerprint authentication at the terminal.",
    spec: "Deployed for PITB",
    image: "/images/solutions/attendance.jpg",
    width: 5578,
    height: 3778,
    photo: true,
  },
  {
    slug: "voter",
    name: "Biometric Voter Verification",
    category: "platforms",
    categoryLabel: "Software platform",
    description:
      "The Biometric Verification Machine captures the voter's National Identity Card number and biometrics, verifying against the national database and the Election Commission's voter list.",
    spec: "NA-120 pilot, 2017",
    verified: true,
    image: "/images/solutions/voter.jpg",
    width: 1500,
    height: 998,
    photo: true,
  },
  {
    slug: "ota",
    name: "OTA Platform",
    category: "platforms",
    categoryLabel: "Software platform",
    description:
      "Pushes new and updated applications to fielded verification devices from a central server, and captures logs in real time without interrupting live business.",
    spec: "Device security & OTA",
    image: "/images/solutions/ota.jpg",
    width: 6000,
    height: 3000,
    photo: true,
  },
  {
    slug: "banking",
    name: "Banking & Disbursement",
    category: "platforms",
    categoryLabel: "Software platform",
    description:
      "Turnkey biometric verification for financial institutions, delivered on Secure Touch desktop and handheld devices, disbursing funds to the correct designated citizen.",
    spec: "Desktop + handheld",
    image: "/images/solutions/banking.jpg",
    width: 1000,
    height: 522,
    photo: true,
  },
  {
    slug: "smart-debit",
    name: "Smart Debit Card System",
    category: "platforms",
    categoryLabel: "Software platform",
    description:
      "An end-to-end biometric-enabled card payment system, built for International Smart Card in Iraq to distribute government grants and pensions through agents on biometric POS terminals.",
    spec: "Iraq · two state banks",
    image: "/images/solutions/smart-card.png",
    width: 1500,
    height: 1225,
  },
  {
    slug: "army-id",
    name: "Smart ID & Access Control",
    category: "platforms",
    categoryLabel: "Software platform",
    description:
      "An enterprise-scale smart-card personnel and vehicle access control system delivered for the Pakistan Army as prime contractor and system integrator — software, hardware and integration.",
    spec: "Prime contractor",
    verified: true,
    image: "/images/solutions/army-id.jpg",
    width: 1500,
    height: 1001,
    photo: true,
  },
];

export const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.featured);

/** The device on the hero plinth — sourced here so its size stays truthful. */
export const HERO_DEVICE = PRODUCTS.find((p) => p.slug === "tps-470")!;

/**
 * The pinned 3D showcase running order.
 *
 * Explicitly ordered rather than filtered on `featured`, for two reasons: only
 * three products carry that flag, which is too short to justify pinning the
 * viewport; and the sequence is a narrative — the enrolment flagship first,
 * down through the handheld range, by way of the facial unit.
 *
 * Every entry must carry a `tagline`. The card shows it in full rather than
 * truncating the long-form `description`, so anything added here needs one.
 *
 * Two constraints on membership. Entries must be cut-out device renders, since
 * photographic frames show their background edges once a card is scaled or
 * rotated. And they must be landscape: the rail puts six cards side by side, so
 * a portrait shot (the TPS 950, at 996×2011) fits its well correctly but still
 * reads as a mistake next to five wide ones. The TPS 950 remains in the full
 * catalogue on /products, where the grid gives it room.
 */
const SHOWCASE_ORDER = [
  "tps-470",
  "tps-900",
  "tps-550s",
  "tps-360c",
  "tps-980",
  "tps-350",
] as const;

export const SHOWCASE_PRODUCTS: readonly Product[] = SHOWCASE_ORDER.map(
  (slug) => {
    const product = PRODUCTS.find((p) => p.slug === slug);
    if (!product) throw new Error(`SHOWCASE_ORDER references unknown slug: ${slug}`);
    return product;
  },
);

/** Software platforms surfaced as pills under the featured row. */
export const PLATFORM_LINKS = PRODUCTS.filter((p) => p.category === "platforms").map((p) => ({
  slug: p.slug,
  label: p.name
    .replace("Biometric ", "")
    .replace(" System", "")
    .replace("Biometric", ""),
}));
