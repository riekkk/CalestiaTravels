"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import type { VisaDocument } from "@/lib/types";
import { cn } from "@/lib/utils";

export function DocumentChecklist({
  requiredDocuments,
  checklist,
  onToggle,
}: {
  requiredDocuments: VisaDocument[];
  checklist: Record<string, boolean>;
  /** Provide to render as an interactive admin checklist; omit for read-only client view. */
  onToggle?: (documentName: string, received: boolean) => Promise<void>;
}) {
  const [savingName, setSavingName] = useState<string | null>(null);

  if (requiredDocuments.length === 0) {
    return (
      <p className="text-sm text-ink/50">
        No document checklist is available for this visa type yet.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {requiredDocuments.map((doc) => {
        const received = checklist[doc.name] === true;
        const interactive = Boolean(onToggle);

        return (
          <li
            key={doc.name}
            className={cn(
              "flex items-start gap-3 rounded-xl border p-4",
              received ? "border-emerald-200 bg-emerald-50/50" : "border-primary/10 bg-white"
            )}
          >
            {interactive ? (
              <button
                type="button"
                disabled={savingName === doc.name}
                onClick={async () => {
                  setSavingName(doc.name);
                  try {
                    await onToggle!(doc.name, !received);
                  } finally {
                    setSavingName(null);
                  }
                }}
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                  received
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-primary/25 bg-white text-transparent hover:border-primary/50"
                )}
                aria-label={received ? "Mark as pending" : "Mark as received"}
              >
                {savingName === doc.name ? (
                  <Loader2 className="h-3 w-3 animate-spin text-primary" />
                ) : (
                  <Check className="h-3.5 w-3.5" />
                )}
              </button>
            ) : (
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
                  received
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-primary/20 bg-white text-transparent"
                )}
              >
                <Check className="h-3.5 w-3.5" />
              </span>
            )}
            <div className="flex-1">
              <p className="text-sm font-medium text-primary-dark">{doc.name}</p>
              {doc.detail && <p className="mt-0.5 text-xs text-ink/55">{doc.detail}</p>}
            </div>
            <span
              className={cn(
                "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium",
                received ? "bg-emerald-100 text-emerald-700" : "bg-amber-50 text-amber-700"
              )}
            >
              {received ? "Received" : "Pending"}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
