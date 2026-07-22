import { CheckCircle2 } from "lucide-react";
import type { TourPackage } from "@/lib/types";
import { formatPeso } from "@/lib/utils";
import { BookingForm } from "@/components/tours/booking-form";

export function PricingCard({ tour }: { tour: TourPackage }) {
  return (
    <div className="sticky top-24 rounded-3xl bg-primary-dark p-7 text-white shadow-[0_20px_60px_-20px_rgba(40,64,94,0.5)]">
      <h3 className="font-heading text-lg font-semibold">{tour.title}</h3>
      <p className="mt-3 font-heading text-4xl font-semibold">
        {formatPeso(tour.price)}
      </p>
      <p className="text-xs text-white/60">{tour.priceUnit}</p>

      <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
        {tour.inclusions.slice(0, 5).map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-white/10 pt-6">
        <BookingForm packageSlug={tour.slug} packageName={tour.title} />
        <p className="mt-4 text-center text-xs text-white/50">
          Limited to {tour.paxRange} per departure.
        </p>
      </div>
    </div>
  );
}
