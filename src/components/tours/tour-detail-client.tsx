"use client";

import { notFound } from "next/navigation";
import { Loader2, Sparkles } from "lucide-react";
import { useTourPackage } from "@/lib/tour-hooks";
import { tourHasFullContent, tourHeroImage, tourQuickInfo } from "@/lib/tour-utils";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { ButtonLink } from "@/components/ui/button";
import { QuickInfoCards } from "@/components/tours/quick-info-card";
import { ItineraryTimeline } from "@/components/tours/itinerary-timeline";
import { InclusionExclusionList } from "@/components/tours/inclusion-exclusion-list";
import { Gallery } from "@/components/tours/gallery";
import { PricingCard } from "@/components/tours/pricing-card";
import { Accordion } from "@/components/ui/accordion";

export function TourDetailClient({ slug }: { slug: string }) {
  const { tour, loading } = useTourPackage(slug);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!tour) notFound();

  if (!tourHasFullContent(tour)) {
    return (
      <Section className="flex flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="h-8 w-8" strokeWidth={1.5} />
        </span>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {tour.destinationLabel}
        </p>
        <h1 className="mt-3 font-heading text-3xl font-semibold text-primary-dark sm:text-4xl">
          {tour.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink/65">
          {tour.overview || tour.tagline}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact">Notify Me When Available</ButtonLink>
          <ButtonLink href="/tours/domestic" variant="secondary">
            Browse Available Tours
          </ButtonLink>
        </div>
      </Section>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden bg-primary-dark text-white">
        <PlaceholderImage
          label={tour.destinationLabel}
          src={tourHeroImage(tour)}
          fill
          sizes="100vw"
          preload
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-primary-dark/40" />
        <div className="container-page relative py-20 sm:py-24">
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white">
            {tour.category === "domestic" ? "Domestic Tour" : "International Tour"}
          </span>
          <h1 className="mt-4 font-heading text-4xl font-semibold sm:text-5xl">{tour.title}</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">{tour.tagline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#pricing" size="lg">
              Book Now
            </ButtonLink>
            <ButtonLink href="#itinerary" variant="outline" size="lg">
              View Itinerary
            </ButtonLink>
          </div>
        </div>
      </section>

      <Section className="pb-0">
        <QuickInfoCards items={tourQuickInfo(tour)} />
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-16 lg:col-span-2">
            <Reveal>
              <div>
                <SectionHeading align="left" eyebrow="Overview" title="Trip Overview" />
                <p className="text-base leading-relaxed text-ink/70">{tour.overview}</p>
              </div>
            </Reveal>

            {tour.highlights.length > 0 && (
              <Reveal>
                <div>
                  <h2 className="mb-6 font-heading text-2xl font-semibold text-primary-dark">
                    Package Highlights
                  </h2>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {tour.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="rounded-xl border border-primary/10 bg-white px-4 py-3 text-sm text-ink/75"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            <div id="itinerary">
              <h2 className="mb-6 font-heading text-2xl font-semibold text-primary-dark">
                Tour Itinerary
              </h2>
              <ItineraryTimeline days={tour.itinerary} />
            </div>

            <div>
              <h2 className="mb-6 font-heading text-2xl font-semibold text-primary-dark">
                Inclusions &amp; Exclusions
              </h2>
              <InclusionExclusionList inclusions={tour.inclusions} exclusions={tour.exclusions} />
            </div>

            <div>
              <h2 className="mb-6 font-heading text-2xl font-semibold text-primary-dark">
                Destination Gallery
              </h2>
              <Gallery photos={tour.photos} destinationLabel={tour.destinationLabel} />
            </div>

            {tour.faqs.length > 0 && (
              <div>
                <h2 className="mb-6 font-heading text-2xl font-semibold text-primary-dark">
                  Frequently Asked Questions
                </h2>
                <Accordion items={tour.faqs} />
              </div>
            )}
          </div>

          <div id="pricing" className="lg:col-span-1">
            <PricingCard tour={tour} />
          </div>
        </div>
      </Section>
    </>
  );
}
