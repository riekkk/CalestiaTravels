"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useAllTourPackages } from "@/lib/admin-hooks";
import { updateTourPackage } from "@/lib/firestore";
import { TourForm, type TourFormData } from "@/components/admin/tour-form";
import type { TourPackage } from "@/lib/types";

function toFormData(tour: TourPackage): TourFormData {
  return {
    slug: tour.slug,
    publishStatus: tour.publishStatus,
    category: tour.category,
    title: tour.title,
    destinationLabel: tour.destinationLabel,
    tagline: tour.tagline,
    overview: tour.overview,
    highlights: tour.highlights,
    inclusions: tour.inclusions,
    exclusions: tour.exclusions,
    pricing: tour.pricing,
    durationDays: tour.durationDays,
    durationNights: tour.durationNights,
    maxGroupSize: tour.maxGroupSize,
    departure: tour.departure,
    photos: tour.photos,
    coverPhotoIndex: tour.coverPhotoIndex,
    itinerary: tour.itinerary,
    availabilityStatus: tour.availabilityStatus,
    remainingSlots: tour.remainingSlots,
    dateRanges: tour.dateRanges,
    faqs: tour.faqs,
  };
}

export default function EditTourPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { tours } = useAllTourPackages(true);
  const tour = tours.find((t) => t.id === id);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(data: TourFormData) {
    setSaved(false);
    await updateTourPackage(id, data);
    setSaved(true);
  }

  if (!tour) {
    return (
      <div>
        <Link href="/admin/tours" className="flex items-center gap-2 text-sm text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Tour Packages
        </Link>
        <p className="mt-6 text-sm text-ink/60">
          This package couldn&apos;t be found, or is still loading.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Link href="/admin/tours" className="flex items-center gap-2 text-sm text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to Tour Packages
      </Link>
      <div className="mt-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
          Edit {tour.title}
        </h1>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Saved
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-ink/55">
        Changes go live on the public site immediately once saved.
      </p>
      <div className="mt-8">
        <TourForm initialData={toFormData(tour)} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
