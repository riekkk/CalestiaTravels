import Link from "next/link";
import { ArrowRight, Clock, MapPin, Users } from "lucide-react";
import type { TourPackage } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { formatPeso } from "@/lib/utils";
import { tourDurationLabel, tourHasFullContent, tourHeroImage, tourStartingPrice } from "@/lib/tour-utils";

export function TourCard({ tour }: { tour: TourPackage }) {
  const hasContent = tourHasFullContent(tour);
  const startingPrice = tourStartingPrice(tour);

  return (
    <Card className="group flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(40,64,94,0.3)]">
      <div className="relative">
        <PlaceholderImage
          label={tour.destinationLabel}
          src={tourHeroImage(tour)}
          className="aspect-16/11"
        />
        <div className="absolute left-4 top-4">
          <Badge tone={hasContent ? "primary" : "neutral"}>
            {hasContent ? tourDurationLabel(tour) : "Coming Soon"}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-xl font-semibold text-primary-dark">
          {tour.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink/65">
          {tour.tagline}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-ink/60">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary" /> {tourDurationLabel(tour)}
          </span>
          {tour.maxGroupSize > 0 && (
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-primary" /> Up to {tour.maxGroupSize} Guests
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" /> From {tour.departure}
          </span>
        </div>

        <div className="mt-6 flex items-end justify-between border-t border-primary/10 pt-4">
          {startingPrice === undefined ? (
            <span className="text-sm font-medium text-ink/50">Details coming soon</span>
          ) : (
            <div>
              <p className="text-xs text-ink/50">Starts at</p>
              <p className="font-heading text-xl font-semibold text-primary-dark">
                {formatPeso(startingPrice)}
                <span className="ml-1 text-xs font-normal text-ink/50">/pax</span>
              </p>
            </div>
          )}
          <Link
            href={`/tours/${tour.slug}`}
            className="flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1"
          >
            {hasContent ? "View Details" : "Learn more"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
