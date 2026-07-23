"use client";

import { useState } from "react";
import { TourCard } from "@/components/tours/tour-card";
import { Reveal } from "@/components/ui/reveal";
import { useActiveTourPackages } from "@/lib/tour-hooks";
import { cn } from "@/lib/utils";

type Tab = "domestic" | "international" | "all";

const tabs: { value: Tab; label: string }[] = [
  { value: "domestic", label: "Domestic" },
  { value: "international", label: "International" },
  { value: "all", label: "All" },
];

const emptyMessage: Record<Tab, string> = {
  domestic: "No domestic tours available yet. Check back soon!",
  international: "No international tours available yet. Check back soon!",
  all: "No tours available yet. Check back soon!",
};

export function TabbedToursListing() {
  const { tours, loading } = useActiveTourPackages();
  const [tab, setTab] = useState<Tab>("domestic");

  const counts: Record<Tab, number> = {
    domestic: tours.filter((t) => t.category === "domestic").length,
    international: tours.filter((t) => t.category === "international").length,
    all: tours.length,
  };

  const filtered = tab === "all" ? tours : tours.filter((t) => t.category === tab);

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-primary/10 pb-6">
        {tabs.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setTab(t.value)}
            aria-pressed={tab === t.value}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              tab === t.value
                ? "bg-primary text-white"
                : "bg-primary/5 text-ink/60 hover:bg-primary/10"
            )}
          >
            {t.label} ({counts[t.value]})
          </button>
        ))}
      </div>

      <div className="mt-10">
        {!loading && filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-ink/50">{emptyMessage[tab]}</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tour, index) => (
              <Reveal key={tour.id} delay={index * 80}>
                <TourCard tour={tour} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
