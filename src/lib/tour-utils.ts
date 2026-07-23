import type { TourPackage, TourQuickInfo } from "@/lib/types";

export function tourHeroImage(
  tour: Pick<TourPackage, "photos" | "coverPhotoIndex">
): string | undefined {
  return tour.photos[tour.coverPhotoIndex] ?? tour.photos[0];
}

export function tourDurationLabel(tour: TourPackage): string {
  const days = `${tour.durationDays} Day${tour.durationDays === 1 ? "" : "s"}`;
  const nights = `${tour.durationNights} Night${tour.durationNights === 1 ? "" : "s"}`;
  return `${days} • ${nights}`;
}

export function tourStartingPrice(tour: TourPackage): number | undefined {
  const values = [tour.pricing.budget, tour.pricing.standard, tour.pricing.luxury].filter(
    (v): v is number => typeof v === "number"
  );
  return values.length ? Math.min(...values) : undefined;
}

export function tourPriceTierList(
  tour: TourPackage
): { label: string; amount: number }[] {
  const tiers: { label: string; amount: number | undefined }[] = [
    { label: "Budget", amount: tour.pricing.budget },
    { label: "Standard", amount: tour.pricing.standard },
    { label: "Luxury", amount: tour.pricing.luxury },
  ];
  return tiers.filter((t): t is { label: string; amount: number } => typeof t.amount === "number");
}

// A package with no itinerary yet reads as a "coming soon" teaser rather
// than a fully bookable trip, regardless of its publish status.
export function tourHasFullContent(tour: TourPackage): boolean {
  return tour.itinerary.length > 0;
}

export function tourQuickInfo(tour: TourPackage): TourQuickInfo[] {
  const items: TourQuickInfo[] = [
    { label: "Destination", value: tour.destinationLabel, icon: "map-pin" },
    { label: "Duration", value: tourDurationLabel(tour), icon: "clock" },
  ];
  if (tour.maxGroupSize > 0) {
    items.push({ label: "Group Size", value: `Up to ${tour.maxGroupSize} Guests`, icon: "users" });
  }
  items.push({ label: "Departure", value: tour.departure, icon: "plane" });
  return items;
}
