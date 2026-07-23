import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { ToursListingClient } from "@/components/tours/tours-listing-client";

export const metadata: Metadata = {
  title: "Domestic Tours",
  description: "Explore Calestia's curated domestic tour packages across the Philippines.",
  alternates: { canonical: "/tours/domestic" },
};

export default function DomesticToursPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Domestic Tours"
        title="Explore the Philippines"
        description="Handpicked island getaways, with new destinations added regularly."
      />
      <ToursListingClient category="domestic" />
    </Section>
  );
}
