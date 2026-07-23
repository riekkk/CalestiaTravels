"use client";

import { cn } from "@/lib/utils";

export type TabItem = {
  id: string;
  label: string;
};

// Underline tabs: brand-primary text + underline when active, muted grey
// when inactive. No pills/boxes. Scrolls horizontally on narrow screens
// instead of wrapping.
export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-6 overflow-x-auto border-b border-primary/10">
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "shrink-0 whitespace-nowrap border-b-2 px-1 pb-3 text-sm font-medium transition-colors",
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-ink/50 hover:text-ink/70"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
