"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatusSelect<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: readonly T[];
  onChange: (next: T) => Promise<void>;
}) {
  const [saving, setSaving] = useState(false);

  return (
    <div className="relative inline-flex items-center">
      <select
        value={value}
        disabled={saving}
        onChange={async (e) => {
          setSaving(true);
          try {
            await onChange(e.target.value as T);
          } finally {
            setSaving(false);
          }
        }}
        className={cn(
          "appearance-none rounded-full border border-primary/15 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-primary-dark outline-none",
          saving && "opacity-60"
        )}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {saving && (
        <Loader2 className="pointer-events-none absolute right-2 h-3 w-3 animate-spin text-primary" />
      )}
    </div>
  );
}
