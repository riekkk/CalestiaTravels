"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2, MapPinned, Plus, Trash2 } from "lucide-react";
import { useAllTourPackages } from "@/lib/admin-hooks";
import { deleteTourPackage, updateTourPackage } from "@/lib/firestore";
import type { TourPackage } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/portal/empty-state";
import { tourStartingPrice } from "@/lib/tour-utils";
import { formatPeso } from "@/lib/utils";

const statusTone = {
  Active: "success",
  Draft: "neutral",
  Archived: "danger",
} as const;

export default function AdminToursPage() {
  const { tours, loading } = useAllTourPackages(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await deleteTourPackage(id);
    } finally {
      setDeletingId(null);
    }
  }

  async function handleTogglePublish(tour: TourPackage) {
    const isLive = tour.publishStatus === "Active";
    if (isLive && !confirm(`Unpublish "${tour.title}"? Clients won't be able to see it anymore.`)) {
      return;
    }
    setTogglingId(tour.id);
    try {
      await updateTourPackage(tour.id, { publishStatus: isLive ? "Draft" : "Active" });
    } finally {
      setTogglingId(null);
    }
  }

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
            Tour Packages
          </h1>
          <p className="mt-1 text-sm text-ink/55">
            Manage what appears on the public Tours pages.
          </p>
        </div>
        <ButtonLink href="/admin/tours/new">
          <Plus className="h-4 w-4" /> New Package
        </ButtonLink>
      </div>

      {!loading && tours.length === 0 ? (
        <EmptyState
          icon={MapPinned}
          title="No tour packages yet"
          description="Create your first package to get it live on the public site."
          action={<ButtonLink href="/admin/tours/new" size="sm">New Package</ButtonLink>}
        />
      ) : (
        <div className="space-y-3">
          {tours.map((tour) => {
            const price = tourStartingPrice(tour);
            return (
              <div
                key={tour.id}
                className="flex flex-col gap-3 rounded-2xl border border-primary/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-primary-dark">{tour.title}</p>
                    <Badge tone={statusTone[tour.publishStatus]}>{tour.publishStatus}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-ink/50">
                    {tour.destinationLabel} · {tour.category} ·{" "}
                    {price !== undefined ? `From ${formatPeso(price)}` : "No pricing set"} ·{" "}
                    {tour.availabilityStatus}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleTogglePublish(tour)}
                    disabled={togglingId === tour.id}
                    className={`flex items-center gap-1.5 text-sm font-medium disabled:opacity-50 ${
                      tour.publishStatus === "Active"
                        ? "text-amber-600 hover:text-amber-700"
                        : "text-emerald-600 hover:text-emerald-700"
                    }`}
                  >
                    {togglingId === tour.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : tour.publishStatus === "Active" ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                    {tour.publishStatus === "Active" ? "Unpublish" : "Publish"}
                  </button>
                  <Link
                    href={`/admin/tours/${tour.id}/edit`}
                    className="text-sm font-medium text-primary hover:text-primary-dark"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(tour.id, tour.title)}
                    disabled={deletingId === tour.id}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    aria-label="Delete package"
                  >
                    {deletingId === tour.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
