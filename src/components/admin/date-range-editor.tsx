"use client";

import { Plus, X } from "lucide-react";
import type { TourDateRange } from "@/lib/types";
import { Input } from "@/components/ui/form-fields";

export function DateRangeEditor({
  ranges,
  onChange,
}: {
  ranges: TourDateRange[];
  onChange: (next: TourDateRange[]) => void;
}) {
  function updateRange(index: number, patch: Partial<TourDateRange>) {
    const next = [...ranges];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  }

  function removeRange(index: number) {
    onChange(ranges.filter((_, i) => i !== index));
  }

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-primary-dark">Available Date Ranges</p>
      <div className="space-y-2">
        {ranges.map((range, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              type="date"
              value={range.start}
              onChange={(e) => updateRange(index, { start: e.target.value })}
              className="flex-1"
            />
            <span className="text-sm text-ink/40">to</span>
            <Input
              type="date"
              value={range.end}
              onChange={(e) => updateRange(index, { end: e.target.value })}
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => removeRange(index)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink/40 hover:bg-red-50 hover:text-red-600"
              aria-label="Remove date range"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...ranges, { start: "", end: "" }])}
        className="mt-2 flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-dark"
      >
        <Plus className="h-3.5 w-3.5" /> Add Date Range
      </button>
    </div>
  );
}
