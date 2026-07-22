import type { Metadata } from "next";
import Link from "next/link";
import { Globe2, MapPin } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { TourCard } from "@/components/tours/tour-card";
import { Reveal } from "@/components/ui/reveal";
import { tourPackages } from "@/lib/data/tours";

export const metadata: Metadata = {
  title: "Tour Packages",
  description: "Browse Calestia's domestic tour packages, with international tours coming soon.",
};

export default function ToursPage() {
  return (
    <>
      <Section className="pb-0">
        <SectionHeading
          eyebrow="Tour Packages"
          title="Where Would You Like to Go?"
          description="Curated getaways across the Philippines, planned down to the last detail — with international destinations on the way."
        />
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          <Link
            href="/tours/domestic"
            className="group flex items-center gap-4 rounded-2xl border border-primary/10 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_12px_30px_-14px_rgba(40,64,94,0.35)]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MapPin className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <div>
              <p className="font-heading text-lg font-semibold text-primary-dark">
                Domestic Tours
              </p>
              <p className="text-sm text-ink/60">
                Dumaguete & Siquijor, Bohol, Cebu, and more.
              </p>
            </div>
          </Link>
          <Link
            href="/tours/international"
            className="group flex items-center gap-4 rounded-2xl border border-primary/10 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_12px_30px_-14px_rgba(40,64,94,0.35)]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Globe2 className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <div>
              <p className="font-heading text-lg font-semibold text-primary-dark">
                International Tours
              </p>
              <p className="text-sm text-ink/60">Coming soon.</p>
            </div>
          </Link>
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tourPackages.map((tour, index) => (
            <Reveal key={tour.slug} delay={index * 80}>
              <TourCard tour={tour} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
