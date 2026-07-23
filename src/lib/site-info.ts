export const SITE_INFO = {
  phone: "0960 304 1887",
  phoneHref: "tel:+639603041887",
  email: "Calestia.assistance@gmail.com",
  emailHref: "mailto:Calestia.assistance@gmail.com",
  address: "General Trias, Cavite, Philippines",
  facebookName: "Calestia Travel and Tours Services",
  facebookUrl: "https://facebook.com/CalestiaTravelServices",
} as const;

// Single source of truth for the production origin. Update this if a custom
// domain is attached in Vercel later — everything (metadataBase, canonical
// links, OG/Twitter image URLs, robots.ts, sitemap.ts) reads from here.
export const SITE_URL = "https://calestiatravels.vercel.app";
export const SITE_NAME = "Calestia Travel and Tours";
export const SITE_DESCRIPTION =
  "Calestia Travel and Tours: Japan visa assistance, tour packages, and travel services based in General Trias, Cavite, Philippines.";
export const SITE_KEYWORDS = [
  "Japan visa Philippines",
  "Japan visa General Trias Cavite",
  "travel agency Cavite",
  "Japan tour packages",
  "visa assistance Philippines",
] as const;
