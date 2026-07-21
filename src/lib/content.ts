import { MEDIA } from "./media";

// ---- Business facts (Cole verifies the tokens marked (verify) before sending) ----
export const BIZ = {
  name: "Boggs Pro Cut",
  legal: "Boggs Professional Cuts & Lawn Maintenance",
  tagline: "One local crew. Every season. From first cut to final snow.",
  city: "Fort Wayne, IN",
  county: "Allen County",
  // (verify) — placeholder line Cole confirms before the demo is sent
  phone: "(260) 710-3521",
  phoneHref: "tel:+12607103521",
  yearsClaim: "10+ years",
  domain: "boggsprocut.com",
};

export type Service = {
  slug: string;
  name: string;
  short: string;
  blurb: string;
  bullets: string[];
  image: string;
  accent: "green" | "grass" | "flagstone" | "steel";
  flagship?: boolean;
};

export const SERVICES: Service[] = [
  {
    slug: "hardscaping",
    name: "Hardscaping & Masonry",
    short: "Walls, walkways & pavers, built to last.",
    blurb:
      "Retaining walls, paver walkways, patios and stone work. This is the craftsmanship that separates Boggs from every mow-and-go crew — real design-build stonework, engineered to hold and made to look like it was always meant to be there.",
    bullets: [
      "Stacked-stone & block retaining walls",
      "Paver walkways, patios & steps",
      "Drainage, grading & slope terracing",
      "Natural stone & masonry accents",
    ],
    image: MEDIA.hardscape,
    accent: "flagstone",
    flagship: true,
  },
  {
    slug: "lawn-care",
    name: "Lawn Care & Maintenance",
    short: "Clean cut lines, week after week.",
    blurb:
      "Mowing, mulching, edging and bush & shrub trimming on a schedule that keeps your property sharp all season — residential and commercial, weekly or bi-weekly.",
    bullets: [
      "Weekly / bi-weekly mowing plans",
      "Mulching & bed refresh",
      "Bush & shrub trimming",
      "Crisp edging & clean-up",
    ],
    image: MEDIA.lawn,
    accent: "grass",
  },
  {
    slug: "landscape-design",
    name: "Landscape Design & Planting",
    short: "Beds, plantings & full-yard design.",
    blurb:
      "From a single bed to a full front-yard redesign — layered plantings, fresh mulch and clean edging that fit your home and your soil. Plants and work guaranteed up to one year.",
    bullets: [
      "Planting bed design & installation",
      "Shrubs, perennials & trees",
      "Mulch, edging & soil prep",
      "1-year plant & workmanship guarantee",
    ],
    image: MEDIA.landscape,
    accent: "green",
  },
  {
    slug: "snow-removal",
    name: "Snow & Ice Removal",
    short: "Plowed and cleared by dawn.",
    blurb:
      "Driveways, sidewalks and parking lots cleared before you head out — residential and commercial. Lock a seasonal contract and stop watching the forecast.",
    bullets: [
      "Residential driveways & sidewalks",
      "Commercial lots & entrances",
      "Seasonal & per-storm contracts",
      "Priority routes across Allen County",
    ],
    image: MEDIA.snow,
    accent: "steel",
  },
];

export const SEASONS = [
  {
    key: "spring",
    label: "Spring",
    line: "Design, plant & clean up",
    detail: "Beds designed, mulch down, everything waking up right.",
    color: "#7CA24B",
  },
  {
    key: "summer",
    label: "Summer",
    line: "Mow & maintain",
    detail: "Crisp cut lines and tidy edges, week after week.",
    color: "#2F5233",
  },
  {
    key: "fall",
    label: "Fall",
    line: "Cleanup & prep",
    detail: "Leaves cleared, beds put to bed, ready for winter.",
    color: "#5A3B27",
  },
  {
    key: "winter",
    label: "Winter",
    line: "Snow & ice removal",
    detail: "Driveways and lots plowed clear before dawn.",
    color: "#2B3A42",
  },
];

export const DIFFERENCE = [
  { title: "Family-owned & local", body: "A Fort Wayne crew you'll actually recognize — the owner is on the job." },
  { title: "Licensed & insured", body: "Fully covered, so your property and your peace of mind are protected." },
  { title: "1-year guarantee", body: "Plants and workmanship guaranteed up to a full year." },
  { title: "100% satisfaction", body: "We don't leave until the work looks the way we'd want our own to." },
  { title: "Free estimates", body: "No-cost, no-pressure quotes on every service, every season." },
  { title: "Residential + commercial", body: "Homes, properties and lots — year-round grounds care and plowing." },
];

export const BEFORE_AFTER = [
  {
    title: "Bare slope → stone retaining wall",
    before: MEDIA.before,
    after: MEDIA.after,
    tag: "Hardscaping",
    town: "Fort Wayne",
  },
  {
    title: "Neglected strip → designed beds",
    before: MEDIA.bedBefore,
    after: MEDIA.bedAfter,
    tag: "Landscape Design",
    town: "New Haven",
  },
];

export const SERVICE_TOWNS = [
  "Fort Wayne",
  "New Haven",
  "Woodburn",
  "Grabill",
  "Leo-Cedarville",
  "Huntertown",
  "Allen County",
];

// Reviews are SAFE PLACEHOLDERS — Cole swaps in real Google/Facebook quotes before sending.
export const REVIEWS = [
  {
    quote:
      "They built our retaining wall and it looks better than the design. Same crew mows every week and plowed us out all winter.",
    name: "Placeholder — verify",
    town: "Fort Wayne",
  },
  {
    quote:
      "Finally a landscaper who shows up. The beds they designed still look sharp a year later.",
    name: "Placeholder — verify",
    town: "New Haven",
  },
  {
    quote:
      "Driveway was cleared before I left for work every single storm. Worth the seasonal contract.",
    name: "Placeholder — verify",
    town: "Leo-Cedarville",
  },
];

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Our Work" },
  { href: "/story", label: "Story" },
  { href: "/estimate", label: "Free Estimate" },
];
