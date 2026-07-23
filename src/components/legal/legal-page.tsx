import type { ReactNode } from "react";
import { Section } from "@/components/ui/section";

export type LegalSection = {
  heading: string;
  body: ReactNode[];
};

export function LegalPage({
  title,
  lastUpdated,
  sections,
}: {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="bg-primary-dark text-white">
        <div className="container-page py-16 text-center sm:py-20">
          <h1 className="font-heading text-3xl font-semibold sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-white/60">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl space-y-10">
          {sections.map((section, index) => (
            <div key={section.heading}>
              <h2 className="font-heading text-xl font-semibold text-primary-dark">
                {index + 1}. {section.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph, i) => (
                  <p key={i} className="text-sm leading-relaxed text-ink/70">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
