import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Reveal } from "@/components/ui/reveal";
import { tourPackages } from "@/lib/data/tours";

export function PopularDestinations() {
  return (
    <Section className="bg-white">
      <SectionHeading
        eyebrow="Popular Destinations"
        title="Explore the Philippines with Calestia"
        description="From waterfalls to white-sand islands — our growing lineup of domestic destinations."
      />
      <div className="grid gap-6 sm:grid-cols-3">
        {tourPackages.map((tour, index) => (
          <Reveal key={tour.slug} delay={index * 80}>
            <Link
              href={`/tours/${tour.slug}`}
              className="group relative block overflow-hidden rounded-2xl"
            >
              <PlaceholderImage label={tour.destinationLabel} className="aspect-3/4" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary-dark/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <p className="font-heading text-lg font-semibold text-white">
                    {tour.destinationLabel}
                  </p>
                  <p className="text-xs text-white/70">
                    {tour.status === "coming-soon" ? "Coming Soon" : tour.duration}
                  </p>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
