import Link from "next/link";
import { ArrowRight, Clock, MapPin, Users } from "lucide-react";
import type { TourPackage } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { formatPeso } from "@/lib/utils";

export function TourCard({ tour }: { tour: TourPackage }) {
  const isComingSoon = tour.status === "coming-soon";

  return (
    <Card className="group flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(40,64,94,0.3)]">
      <div className="relative">
        <PlaceholderImage label={tour.destinationLabel} className="aspect-16/11" />
        <div className="absolute left-4 top-4">
          <Badge tone={isComingSoon ? "neutral" : "primary"}>
            {isComingSoon ? "Coming Soon" : tour.eyebrow}
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
            <Clock className="h-3.5 w-3.5 text-primary" /> {tour.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-primary" /> {tour.paxRange}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" /> From {tour.departure}
          </span>
        </div>

        <div className="mt-6 flex items-end justify-between border-t border-primary/10 pt-4">
          {isComingSoon ? (
            <span className="text-sm font-medium text-ink/50">Details coming soon</span>
          ) : (
            <div>
              <p className="text-xs text-ink/50">Starts at</p>
              <p className="font-heading text-xl font-semibold text-primary-dark">
                {formatPeso(tour.price)}
                <span className="ml-1 text-xs font-normal text-ink/50">/pax</span>
              </p>
            </div>
          )}
          <Link
            href={`/tours/${tour.slug}`}
            className="flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1"
          >
            {isComingSoon ? "Learn more" : "View Details"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
