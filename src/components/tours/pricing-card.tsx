import { CheckCircle2 } from "lucide-react";
import type { TourPackage } from "@/lib/types";
import { formatPeso } from "@/lib/utils";
import { tourPriceTierList } from "@/lib/tour-utils";
import { Badge } from "@/components/ui/badge";
import { BookingForm } from "@/components/tours/booking-form";

const availabilityTone = {
  Available: "success",
  "Limited Slots": "warning",
  "Sold Out": "danger",
} as const;

export function PricingCard({ tour }: { tour: TourPackage }) {
  const tiers = tourPriceTierList(tour);
  const isSoldOut = tour.availabilityStatus === "Sold Out";

  return (
    <div className="sticky top-24 rounded-3xl bg-primary-dark p-7 text-white shadow-[0_20px_60px_-20px_rgba(40,64,94,0.5)]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-heading text-lg font-semibold">{tour.title}</h3>
        <Badge tone={availabilityTone[tour.availabilityStatus]}>{tour.availabilityStatus}</Badge>
      </div>

      {tiers.length > 0 ? (
        <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
          {tiers.map((tier) => (
            <li key={tier.label} className="flex items-center justify-between text-sm">
              <span className="text-white/70">{tier.label}</span>
              <span className="font-heading text-lg font-semibold">
                {formatPeso(tier.amount)}
                <span className="ml-1 text-xs font-normal text-white/50">/pax</span>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 border-t border-white/10 pt-4 text-sm text-white/60">
          Pricing to be announced.
        </p>
      )}

      {tour.availabilityStatus === "Limited Slots" && tour.remainingSlots !== undefined && (
        <p className="mt-3 text-xs text-amber-200">
          Only {tour.remainingSlots} slot{tour.remainingSlots === 1 ? "" : "s"} remaining.
        </p>
      )}

      <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
        {tour.inclusions.slice(0, 5).map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-white/10 pt-6">
        {isSoldOut ? (
          <p className="rounded-xl bg-white/10 p-4 text-center text-sm text-white/70">
            This departure is fully booked. Contact us to join the waitlist.
          </p>
        ) : (
          <>
            <BookingForm packageSlug={tour.slug} packageName={tour.title} />
            {tour.maxGroupSize > 0 && (
              <p className="mt-4 text-center text-xs text-white/50">
                Limited to {tour.maxGroupSize} guests per departure.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
