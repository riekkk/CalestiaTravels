import { Section, SectionHeading } from "@/components/ui/section";
import { TourCard } from "@/components/tours/tour-card";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { tourPackages } from "@/lib/data/tours";

export function FeaturedTours() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Tour Packages"
        title="Featured Getaways"
        description="Handpicked domestic itineraries, planned down to the last ferry ride — with more destinations added regularly."
      />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tourPackages.map((tour, index) => (
          <Reveal key={tour.slug} delay={index * 80}>
            <TourCard tour={tour} />
          </Reveal>
        ))}
      </div>

      <div className="mt-12 text-center">
        <ButtonLink href="/tours" variant="secondary">
          View All Tour Packages
        </ButtonLink>
      </div>
    </Section>
  );
}
