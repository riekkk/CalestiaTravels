"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import type { ItineraryDay } from "@/lib/types";
import { Input, Label } from "@/components/ui/form-fields";
import { StringListEditor } from "@/components/admin/string-list-editor";

function renumber(days: ItineraryDay[]): ItineraryDay[] {
  return days.map((day, index) => ({ ...day, day: index + 1 }));
}

export function ItineraryEditor({
  days,
  onChange,
}: {
  days: ItineraryDay[];
  onChange: (next: ItineraryDay[]) => void;
}) {
  function updateDay(index: number, patch: Partial<ItineraryDay>) {
    const next = [...days];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  }

  function removeDay(index: number) {
    onChange(renumber(days.filter((_, i) => i !== index)));
  }

  function addDay() {
    onChange([
      ...days,
      { day: days.length + 1, title: "", activities: [], meals: "", accommodation: "" },
    ]);
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= days.length) return;
    const next = [...days];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(renumber(next));
  }

  return (
    <div className="space-y-4">
      {days.map((day, index) => (
        <div key={index} className="rounded-2xl border border-primary/10 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-heading text-sm font-semibold text-white">
              {day.day}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-ink/40 hover:bg-primary/5 disabled:opacity-30"
                aria-label="Move day up"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === days.length - 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-ink/40 hover:bg-primary/5 disabled:opacity-30"
                aria-label="Move day down"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => removeDay(index)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600"
                aria-label="Remove day"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <Label htmlFor={`day-title-${index}`}>Day Title</Label>
          <Input
            id={`day-title-${index}`}
            value={day.title}
            onChange={(e) => updateDay(index, { title: e.target.value })}
            placeholder={`Day ${day.day} — Arrival in Tokyo`}
          />

          <div className="mt-4">
            <StringListEditor
              label="Activities"
              items={day.activities}
              onChange={(activities) => updateDay(index, { activities })}
              placeholder="e.g. Sensoji Temple visit"
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`day-meals-${index}`}>Meals Included</Label>
              <Input
                id={`day-meals-${index}`}
                value={day.meals ?? ""}
                onChange={(e) => updateDay(index, { meals: e.target.value })}
                placeholder="e.g. Breakfast, Dinner"
              />
            </div>
            <div>
              <Label htmlFor={`day-stay-${index}`}>Accommodation</Label>
              <Input
                id={`day-stay-${index}`}
                value={day.accommodation ?? ""}
                onChange={(e) => updateDay(index, { accommodation: e.target.value })}
                placeholder="e.g. Shinjuku Hotel"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addDay}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/20 py-4 text-sm font-medium text-primary hover:border-primary/40 hover:bg-primary/5"
      >
        <Plus className="h-4 w-4" /> Add Day
      </button>
    </div>
  );
}
