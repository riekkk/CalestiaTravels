import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ApplyVisaButton } from "@/components/portal/apply-visa/apply-visa-button";
import { visaTypes } from "@/lib/data/visa-types";

const points = [
  "Document review against the exact Embassy checklist for your visa type",
  "Computerized, error-free forms, no handwritten resubmissions",
  "Average 5–7 working day processing once filed",
];

export function VisaAssistanceTeaser() {
  return (
    <Section className="bg-white">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Visa Assistance
            </p>
            <h2 className="font-heading text-3xl font-semibold text-primary-dark sm:text-4xl">
              Japan Visa Processing, Handled with Precision
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              As a dedicated Japan visa specialist, Calestia guides you through
              every category, from tourism to visiting relatives, students,
              workers, and dependents, with a document checklist built
              directly around Embassy requirements.
            </p>
            <ul className="mt-6 space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-ink/75">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/visa">Explore Visa Assistance</ButtonLink>
              <ApplyVisaButton variant="secondary">Apply Now</ApplyVisaButton>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {visaTypes.slice(0, 4).map((visa) => (
              <div
                key={visa.slug}
                className="rounded-2xl border border-primary/10 bg-bg-light p-5"
              >
                <p className="font-heading text-sm font-semibold text-primary-dark">
                  {visa.shortTitle}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink/60">
                  {visa.summary}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
