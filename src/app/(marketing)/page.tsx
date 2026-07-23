import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { FeaturedTours } from "@/components/sections/featured-tours";
import { VisaAssistanceTeaser } from "@/components/sections/visa-assistance-teaser";
import { WhyChooseCalestia } from "@/components/sections/why-choose-calestia";
import { PopularDestinations } from "@/components/sections/popular-destinations";
import { LeaveAReview } from "@/components/sections/leave-a-review";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SITE_DESCRIPTION, SITE_INFO, SITE_NAME, SITE_URL } from "@/lib/site-info";

export const metadata: Metadata = {
  description:
    "Where every Japan journey begins. Calestia Travel and Tours offers expert Japan visa assistance and curated domestic tour packages, based in General Trias, Cavite, Philippines.",
  alternates: {
    canonical: "/",
  },
};

// Only fields we can actually verify from real site content (site-info.ts,
// footer). No street address, geo coordinates, opening hours, or price range —
// none of those are confirmed anywhere in this codebase, so they're omitted
// rather than guessed. See the SEO report for what's still needed from Kier.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/logo.png`,
  telephone: SITE_INFO.phoneHref.replace("tel:", ""),
  email: SITE_INFO.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "General Trias",
    addressRegion: "Cavite",
    addressCountry: "PH",
  },
  sameAs: [SITE_INFO.facebookUrl],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <FeaturedTours />
      <VisaAssistanceTeaser />
      <WhyChooseCalestia />
      <PopularDestinations />
      <LeaveAReview />
      <CtaBanner />
    </>
  );
}
