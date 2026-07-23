"use client";

import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/form-fields";

export function StringListEditor({
  label,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  items: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  function updateItem(index: number, value: string) {
    const next = [...items];
    next[index] = value;
    onChange(next);
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function addItem() {
    onChange([...items, ""]);
  }

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-primary-dark">{label}</p>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink/40 hover:bg-red-50 hover:text-red-600"
              aria-label={`Remove ${label} item`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="mt-2 flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-dark"
      >
        <Plus className="h-3.5 w-3.5" /> Add {label.replace(/s$/, "")}
      </button>
    </div>
  );
}
