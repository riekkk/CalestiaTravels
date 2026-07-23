import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { getVisaTypeBySlug, multipleEntryCategories, visaTypes } from "@/lib/data/visa-types";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { RequirementChecklist } from "@/components/visa/requirement-checklist";
import { ApplyVisaButton } from "@/components/portal/apply-visa/apply-visa-button";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return visaTypes.map((visa) => ({ slug: visa.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const visa = getVisaTypeBySlug(slug);
  if (!visa) return {};
  return {
    title: visa.shortTitle,
    description: visa.summary,
    alternates: { canonical: `/visa/${slug}` },
  };
}

export default async function VisaTypeDetailPage({ params }: Props) {
  const { slug } = await params;
  const visa = getVisaTypeBySlug(slug);

  if (!visa) notFound();

  return (
    <>
      <section className="bg-primary-dark text-white">
        <div className="container-page py-16 sm:py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Visa Assistance
          </p>
          <h1 className="font-heading text-3xl font-semibold sm:text-4xl">{visa.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
            {visa.description}
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeading
              align="left"
              eyebrow="Checklist"
              title="Required Documents"
              description="Prepare each item below before your appointment. Your Calestia coordinator will review everything with you."
            />
            <RequirementChecklist documents={visa.requiredDocuments} />

            {slug === "tourist-multiple-entry" && (
              <div className="mt-12">
                <h3 className="mb-4 font-heading text-xl font-semibold text-primary-dark">
                  Multiple-Entry Eligibility Categories
                </h3>
                <p className="mb-6 text-sm text-ink/60">
                  Applicants must satisfy one of the following categories, with
                  supporting proof, to qualify for a multiple-entry visa.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {multipleEntryCategories.map((category) => (
                    <div
                      key={category.title}
                      className="rounded-2xl border border-primary/10 bg-white p-5"
                    >
                      <p className="font-medium text-primary-dark">{category.title}</p>
                      <ul className="mt-2 space-y-1.5">
                        {category.points.map((point) => (
                          <li key={point} className="text-xs leading-relaxed text-ink/60">
                            • {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <Reveal>
              <div className="sticky top-24 space-y-6">
                {visa.notes.length > 0 && (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                    <div className="flex items-center gap-2 text-amber-700">
                      <AlertCircle className="h-5 w-5" />
                      <p className="font-medium">Important Notes</p>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {visa.notes.map((note) => (
                        <li key={note} className="text-sm leading-relaxed text-amber-800/80">
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="rounded-2xl bg-primary-dark p-6 text-white">
                  <p className="font-heading text-lg font-semibold">
                    Ready to apply?
                  </p>
                  <p className="mt-2 text-sm text-white/70">
                    Start your application through the Client Portal and
                    upload your documents securely.
                  </p>
                  <ApplyVisaButton variant="outline" className="mt-4 w-full">
                    Apply Now
                  </ApplyVisaButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
