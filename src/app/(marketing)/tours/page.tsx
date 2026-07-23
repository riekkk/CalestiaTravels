import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { TabbedToursListing } from "@/components/tours/tabbed-tours-listing";

export const metadata: Metadata = {
  title: "Tour Packages",
  description: "Browse Calestia's domestic and international tour packages.",
  alternates: { canonical: "/tours" },
};

export default function ToursPage() {
  return (
    <Section>
      <SectionHeading
        as="h1"
        eyebrow="Tour Packages"
        title="Where Would You Like to Go?"
        description="Curated getaways across the Philippines and beyond, planned down to the last detail."
      />
      <TabbedToursListing />
    </Section>
  );
}
