import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { FeaturedTours } from "@/components/sections/featured-tours";
import { VisaAssistanceTeaser } from "@/components/sections/visa-assistance-teaser";
import { WhyChooseCalestia } from "@/components/sections/why-choose-calestia";
import { PopularDestinations } from "@/components/sections/popular-destinations";
import { LeaveAReview } from "@/components/sections/leave-a-review";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  description:
    "Where every Japan journey begins. Calestia Travel and Tours offers expert Japan visa assistance and curated domestic tour packages, based in General Trias, Cavite, Philippines.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
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
