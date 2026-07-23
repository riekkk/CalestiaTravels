"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { VISA_REQUIREMENTS_CHECKLIST } from "@/lib/data/forms";
import { cn } from "@/lib/utils";

export function VisaRequirementsChecklist({
  checklist,
  onToggle,
}: {
  checklist: Record<string, boolean>;
  onToggle: (itemId: string, checked: boolean) => Promise<void>;
}) {
  const [savingId, setSavingId] = useState<string | null>(null);

  const total = VISA_REQUIREMENTS_CHECKLIST.length;
  const completed = VISA_REQUIREMENTS_CHECKLIST.filter((item) => checklist[item.id]).length;
  const progress = total === 0 ? 0 : (completed / total) * 100;

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <p className="shrink-0 text-sm font-medium text-primary-dark">
          {completed} of {total} completed
        </p>
        <div className="h-1.5 flex-1 max-w-xs overflow-hidden rounded-full bg-primary/10">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <ul className="space-y-2">
        {VISA_REQUIREMENTS_CHECKLIST.map((item) => {
          const checked = checklist[item.id] === true;
          return (
            <li
              key={item.id}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-4",
                checked ? "border-emerald-200 bg-emerald-50/50" : "border-primary/10 bg-white"
              )}
            >
              <button
                type="button"
                disabled={savingId === item.id}
                onClick={async () => {
                  setSavingId(item.id);
                  try {
                    await onToggle(item.id, !checked);
                  } finally {
                    setSavingId(null);
                  }
                }}
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                  checked
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-primary/25 bg-white text-transparent hover:border-primary/50"
                )}
                aria-label={checked ? "Mark as not completed" : "Mark as completed"}
              >
                {savingId === item.id ? (
                  <Loader2 className="h-3 w-3 animate-spin text-primary" />
                ) : (
                  <Check className="h-3.5 w-3.5" />
                )}
              </button>
              <p className={cn("flex-1 text-sm", checked ? "text-primary-dark" : "text-ink/75")}>
                {item.label}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
