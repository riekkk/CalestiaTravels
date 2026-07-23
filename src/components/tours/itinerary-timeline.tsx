import { Bed, CheckCircle2, UtensilsCrossed } from "lucide-react";
import type { ItineraryDay } from "@/lib/types";
import { Reveal } from "@/components/ui/reveal";

export function ItineraryTimeline({ days }: { days: ItineraryDay[] }) {
  return (
    <div className="relative">
      <div className="absolute left-5 top-2 bottom-2 w-px bg-primary/15 sm:left-6" />
      <div className="space-y-10">
        {days.map((day, index) => (
          <Reveal key={day.day} delay={index * 80}>
            <div className="relative flex gap-5 sm:gap-6">
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm font-semibold text-white sm:h-12 sm:w-12 sm:text-base">
                {day.day}
              </div>
              <div className="flex-1 rounded-2xl border border-primary/10 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Day {day.day}
                </p>
                <h3 className="mt-1 font-heading text-lg font-semibold text-primary-dark">
                  {day.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {day.activities.map((activity) => (
                    <li
                      key={activity}
                      className="flex items-start gap-2.5 text-sm text-ink/70"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" />
                      {activity}
                    </li>
                  ))}
                </ul>
                {(day.meals || day.accommodation) && (
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-primary/10 pt-4 text-xs text-ink/55">
                    {day.meals && (
                      <span className="flex items-center gap-1.5">
                        <UtensilsCrossed className="h-3.5 w-3.5 text-primary/50" /> {day.meals}
                      </span>
                    )}
                    {day.accommodation && (
                      <span className="flex items-center gap-1.5">
                        <Bed className="h-3.5 w-3.5 text-primary/50" /> {day.accommodation}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
