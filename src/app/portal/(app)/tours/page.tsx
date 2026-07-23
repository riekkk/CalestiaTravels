"use client";

import { MapPinned } from "lucide-react";
import { useActiveTourPackages } from "@/lib/tour-hooks";
import { TourCard } from "@/components/tours/tour-card";
import { EmptyState } from "@/components/portal/empty-state";

export default function PortalToursPage() {
  const { tours, loading } = useActiveTourPackages();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
          Tour Packages
        </h1>
        <p className="mt-1 text-sm text-ink/55">
          Browse available tour packages. Request a slot from the Bookings page.
        </p>
      </div>

      {!loading && tours.length === 0 ? (
        <EmptyState
          icon={MapPinned}
          title="No tour packages available"
          description="Check back soon for new destinations."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      )}
    </div>
  );
}
