import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Applicant Details", "Payment", "Confirmation"] as const;

export function ApplyVisaStepper({ currentStep }: { currentStep: 0 | 1 | 2 }) {
  return (
    <div className="mb-8 flex items-center">
      {STEPS.map((label, index) => {
        const completed = index < currentStep;
        const active = index === currentStep;
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  completed
                    ? "bg-primary text-white"
                    : active
                      ? "bg-primary/15 text-primary ring-2 ring-primary/30"
                      : "bg-primary/10 text-primary/40"
                )}
              >
                {completed ? <Check className="h-3.5 w-3.5" /> : index + 1}
              </span>
              <p
                className={cn(
                  "text-[11px] font-medium sm:text-xs",
                  completed || active ? "text-primary-dark" : "text-ink/40"
                )}
              >
                {label}
                {completed && (
                  <span className="ml-1 text-emerald-600">&#10003;</span>
                )}
              </p>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-0.5 flex-1",
                  index < currentStep ? "bg-primary" : "bg-primary/10"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
