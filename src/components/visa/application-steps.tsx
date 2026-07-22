import { applicationGuidelines } from "@/lib/data/visa-types";
import { Reveal } from "@/components/ui/reveal";

export function ApplicationSteps() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {applicationGuidelines.map((guideline, index) => (
        <Reveal key={guideline.title} delay={index * 70}>
          <div className="h-full rounded-2xl border border-primary/10 bg-white p-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-heading text-sm font-semibold text-white">
              {index + 1}
            </span>
            <h3 className="mt-4 font-heading text-lg font-semibold text-primary-dark">
              {guideline.title}
            </h3>
            <ul className="mt-3 space-y-2">
              {guideline.points.map((point) => (
                <li key={point} className="text-sm leading-relaxed text-ink/65">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
