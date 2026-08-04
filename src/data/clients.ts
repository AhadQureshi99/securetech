export type Client = {
  src: string;
  name: string;
  /** True intrinsic size — these logos range from 0.72 to 4.90 in aspect. */
  width: number;
  height: number;
};

/** Order is tuned for the marquee — recognisable marks lead. */
export const CLIENTS: readonly Client[] = [
  { src: "/images/clients/jazz.png", name: "Jazz", width: 150, height: 150 },
  { src: "/images/clients/ufone.png", name: "Ufone", width: 253, height: 108 },
  { src: "/images/clients/zong.png", name: "Zong", width: 186, height: 150 },
  { src: "/images/clients/Telenor_logo.png", name: "Telenor", width: 300, height: 125 },
  { src: "/images/clients/ptcl.png", name: "PTCL", width: 250, height: 108 },
  { src: "/images/clients/pta.png", name: "Pakistan Telecommunication Authority", width: 250, height: 108 },
  { src: "/images/clients/army.png", name: "Pakistan Army", width: 150, height: 150 },
  { src: "/images/clients/ubank.png", name: "U Bank", width: 250, height: 140 },
  { src: "/images/clients/pitb.png", name: "Punjab Information Technology Board", width: 150, height: 150 },
  { src: "/images/clients/nayapay.png", name: "NayaPay", width: 250, height: 51 },
  { src: "/images/clients/kenya.png", name: "Government of Kenya", width: 125, height: 123 },
  { src: "/images/clients/sudan.png", name: "Sudan Ministry of Interior", width: 148, height: 140 },
  { src: "/images/clients/korek.png", name: "Korek Telecom", width: 250, height: 108 },
  { src: "/images/clients/isc.png", name: "International Smart Card", width: 187, height: 117 },
];

/** Everything, for the grid on the Company page. */
export const ALL_CLIENTS: readonly Client[] = [
  ...CLIENTS.slice(0, 4),
  { src: "/images/clients/warid.png", name: "Warid", width: 150, height: 150 },
  ...CLIENTS.slice(4, 10),
  { src: "/images/clients/govt.png", name: "Government of Pakistan", width: 123, height: 139 },
  { src: "/images/clients/karandaz.jpg", name: "Karandaaz Pakistan", width: 200, height: 114 },
  { src: "/images/clients/nsrp.png", name: "NSRP", width: 180, height: 68 },
  { src: "/images/clients/pmd.png", name: "Pakistan Meteorological Department", width: 250, height: 108 },
  { src: "/images/clients/kplc.png", name: "Kenya Power and Lighting Company", width: 99, height: 137 },
  ...CLIENTS.slice(10),
];
