"use client";

import { Section, SectionHeading } from "@/components/ui/section";
import { TourCard } from "@/components/tours/tour-card";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { useActiveTourPackages } from "@/lib/tour-hooks";

export function FeaturedTours() {
  const { tours, loading } = useActiveTourPackages();

  if (loading) return null;

  return (
    <Section>
      <SectionHeading
        eyebrow="Tour Packages"
        title="Featured Getaways"
        description="Handpicked itineraries, planned down to the last ferry ride, with more destinations added regularly."
      />

      {tours.length === 0 ? (
        <div className="mx-auto max-w-md text-center">
          <p className="text-sm text-ink/60">
            Tours coming soon — we&apos;re putting the finishing touches on our first packages.
          </p>
          <ButtonLink href="/contact" variant="secondary" className="mt-6">
            Inquire About a Custom Trip
          </ButtonLink>
        </div>
      ) : (
        <>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {tours.slice(0, 6).map((tour, index) => (
              <Reveal key={tour.id} delay={index * 80}>
                <TourCard tour={tour} />
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <ButtonLink href="/tours" variant="secondary">
              View All Tour Packages
            </ButtonLink>
          </div>
        </>
      )}
    </Section>
  );
}
