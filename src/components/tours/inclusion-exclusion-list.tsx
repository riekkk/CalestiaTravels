import { CheckCircle2, XCircle } from "lucide-react";

export function InclusionExclusionList({
  inclusions,
  exclusions,
}: {
  inclusions: string[];
  exclusions: string[];
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="rounded-2xl border border-primary/10 bg-white p-6">
        <h3 className="font-heading text-lg font-semibold text-primary-dark">
          What&apos;s Included
        </h3>
        <ul className="mt-4 space-y-3">
          {inclusions.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-ink/75">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-primary/10 bg-white p-6">
        <h3 className="font-heading text-lg font-semibold text-primary-dark">
          Not Included
        </h3>
        <ul className="mt-4 space-y-3">
          {exclusions.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-ink/60">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-ink/30" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
