import { Clock, MapPin, Plane, Users } from "lucide-react";
import type { TourQuickInfo } from "@/lib/types";

const icons = {
  "map-pin": MapPin,
  clock: Clock,
  users: Users,
  plane: Plane,
};

export function QuickInfoCards({ items }: { items: TourQuickInfo[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = icons[item.icon];
        return (
          <div
            key={item.label}
            className="rounded-2xl border border-primary/10 bg-white p-5"
          >
            <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
            <p className="mt-3 text-xs uppercase tracking-wide text-ink/45">
              {item.label}
            </p>
            <p className="mt-1 font-heading text-sm font-semibold text-primary-dark">
              {item.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
