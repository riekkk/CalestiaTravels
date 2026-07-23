"use client";

import { Globe2, MapPin } from "lucide-react";
import type { TourPackage } from "@/lib/types";
import { cn } from "@/lib/utils";

const options: {
  value: TourPackage["category"];
  label: string;
  description: string;
  icon: typeof MapPin;
}[] = [
  {
    value: "domestic",
    label: "Domestic",
    description: "Tours within the Philippines.",
    icon: MapPin,
  },
  {
    value: "international",
    label: "International",
    description: "Tours outside the Philippines.",
    icon: Globe2,
  },
];

export function CategorySelector({
  value,
  onChange,
}: {
  value: TourPackage["category"];
  onChange: (value: TourPackage["category"]) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={selected}
            className={cn(
              "flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition-colors",
              selected
                ? "border-primary bg-primary/5"
                : "border-primary/10 bg-white hover:border-primary/30"
            )}
          >
            <span
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                selected ? "bg-primary text-white" : "bg-primary/10 text-primary"
              )}
            >
              <option.icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span>
              <span className="block font-heading text-sm font-semibold text-primary-dark">
                {option.label}
              </span>
              <span className="mt-0.5 block text-xs text-ink/60">{option.description}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
