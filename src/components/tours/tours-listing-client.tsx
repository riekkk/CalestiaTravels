"use client";

import { TourCard } from "@/components/tours/tour-card";
import { Reveal } from "@/components/ui/reveal";
import { useActiveTourPackages } from "@/lib/tour-hooks";

export function ToursListingClient({
  category,
}: {
  category?: "domestic" | "international";
}) {
  const { tours } = useActiveTourPackages();
  const filtered = category ? tours.filter((t) => t.category === category) : tours;

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((tour, index) => (
        <Reveal key={tour.id} delay={index * 80}>
          <TourCard tour={tour} />
        </Reveal>
      ))}
    </div>
  );
}
