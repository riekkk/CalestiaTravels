import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { TourCard } from "@/components/tours/tour-card";
import { Reveal } from "@/components/ui/reveal";
import { tourPackages } from "@/lib/data/tours";

export const metadata: Metadata = {
  title: "Domestic Tours",
  description: "Explore Calestia's curated domestic tour packages across the Philippines.",
};

export default function DomesticToursPage() {
  const domesticTours = tourPackages.filter((tour) => tour.category === "domestic");

  return (
    <Section>
      <SectionHeading
        eyebrow="Domestic Tours"
        title="Explore the Philippines"
        description="Handpicked island getaways, with new destinations added regularly."
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {domesticTours.map((tour, index) => (
          <Reveal key={tour.slug} delay={index * 80}>
            <TourCard tour={tour} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
