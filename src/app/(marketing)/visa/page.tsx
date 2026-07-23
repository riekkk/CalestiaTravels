import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { VisaTypeCard } from "@/components/visa/visa-type-card";
import { ApplicationSteps } from "@/components/visa/application-steps";
import { DownloadableForms } from "@/components/visa/downloadable-forms";
import { visaTypes } from "@/lib/data/visa-types";

export const metadata: Metadata = {
  title: "Visa Assistance",
  description:
    "Calestia is a Japan visa specialist — explore visa types, requirements, application steps, and downloadable forms.",
  alternates: { canonical: "/visa" },
};

const visaFaqs = [
  {
    question: "How long does visa processing take?",
    answer:
      "Average processing time is 5–7 working days once filed, though this may vary depending on VFS and Embassy timelines.",
  },
  {
    question: "Do application forms need to be typed?",
    answer:
      "Yes. All application forms must be typed (computerized), including Page 2 — Inviter/Guarantor information — and the date. Handwritten forms are not accepted.",
  },
  {
    question: "How many authorization letters should I prepare?",
    answer: "Applicants must submit two (2) sets of authorization letters.",
  },
  {
    question: "What paper size is required?",
    answer:
      "All forms and letters must be printed on A4-size paper — VFS strictly enforces this requirement.",
  },
];

export default function VisaAssistancePage() {
  return (
    <>
      <section className="bg-primary-dark text-white">
        <div className="container-page py-20 text-center sm:py-24">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Visa Assistance
          </p>
          <h1 className="font-heading text-4xl font-semibold sm:text-5xl">
            Your Japan Visa, Handled with Precision
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75">
            Calestia specializes exclusively in Japan visa processing. Every
            checklist below is built directly around Embassy requirements —
            so you know exactly what to prepare before you file.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/portal/applications/new" size="lg">
              Apply Now
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              Talk to Our Team
            </ButtonLink>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="Visa Types"
          title="Available Visa Categories"
          description="Choose the category that matches your purpose of travel to see the full document checklist."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visaTypes.map((visa, index) => (
            <Reveal key={visa.slug} delay={index * 70}>
              <VisaTypeCard visa={visa} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeading
          eyebrow="How It Works"
          title="Step-by-Step Application Process"
          description="A few essential rules from the Embassy that keep your application moving without delays."
        />
        <ApplicationSteps />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Downloadable Forms"
          title="Get Your Forms Ready"
          description="Download and prepare these forms ahead of your appointment."
        />
        <DownloadableForms />
      </Section>

      <Section className="bg-white">
        <SectionHeading eyebrow="FAQ" title="Visa Assistance FAQs" />
        <div className="mx-auto max-w-3xl">
          <Accordion items={visaFaqs} />
        </div>
      </Section>

      <section className="bg-primary-dark">
        <div className="container-page py-20 text-center text-white">
          <h2 className="font-heading text-3xl font-semibold sm:text-4xl">
            Ready to start your application?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Create a free Client Portal account to submit your application,
            upload documents, and track your status in real time.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/portal/register" size="lg">
              Apply Now
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
