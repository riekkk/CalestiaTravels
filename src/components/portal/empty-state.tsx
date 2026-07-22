import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-primary/20 bg-white px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </span>
      <p className="mt-4 font-heading text-lg font-semibold text-primary-dark">{title}</p>
      <p className="mt-1.5 max-w-sm text-sm text-ink/55">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
