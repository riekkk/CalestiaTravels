import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-info";
import { visaTypes } from "@/lib/data/visa-types";
import { adminGetActiveTourSlugs } from "@/lib/admin-tour-lookup";

const STATIC_ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/reviews", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/tours", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/tours/domestic", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/tours/international", priority: 0.4, changeFrequency: "monthly" as const },
  { path: "/visa", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const visaEntries: MetadataRoute.Sitemap = visaTypes.map((visa) => ({
    url: `${SITE_URL}/visa/${visa.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const tourSlugs = await adminGetActiveTourSlugs();
  const tourEntries: MetadataRoute.Sitemap = tourSlugs.map((slug) => ({
    url: `${SITE_URL}/tours/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...visaEntries, ...tourEntries];
}
