import type { Metadata } from "next";
import { Compass, ShieldCheck, Target } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Calestia Travel and Tours' philosophy, mission, and vision: a family-backed Japan visa specialist built on precision and compliance.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-primary-dark text-white">
        <div className="container-page py-20 text-center sm:py-24">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            About Calestia
          </p>
          <h1 className="font-heading text-4xl font-semibold sm:text-5xl">
            Precision Architecture in Travel Governance
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75">
            Calestia Travel & Tours is a Japan visa specialist based in
            General Trias, Cavite. We handle the paperwork, the checklist,
            and the follow-through so your trip starts with a lot less
            stress, from your first inquiry to the day your passport comes
            back with your visa inside.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <PlaceholderImage
              label="Calestia Team"
              src="/images/about/team-photo.jpg"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-4/3 rounded-3xl"
            />
          </Reveal>
          <Reveal delay={100}>
            <div>
              <SectionHeading
                align="left"
                eyebrow="Our Philosophy"
                title="Travel is Governance, Not Just an Adventure"
              />
              <p className="text-base leading-relaxed text-ink/70">
                At Calestia, we call our corporate philosophy{" "}
                <span className="font-medium text-primary-dark">
                  &ldquo;Precision Architecture in Travel Governance.&rdquo;
                </span>{" "}
                We treat international travel as more than a financial
                transaction. It&apos;s a significant process encompassing
                compliance with all regulations. To us, travel starts with a
                proper understanding and processing of information, ensuring
                compliance, and protecting the safety and security of your
                data. In implementing this approach, Calestia balances
                institutional rigor with a family-owned business approach.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-primary/10 bg-bg-light p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Compass className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 font-heading text-2xl font-semibold text-primary-dark">
                Vision
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                To become a premier, highly trusted gateway for international
                travel and global documentation, recognized nationwide for
                absolute precision, premium service, and, as we grow, full
                Department of Tourism (DOT) accreditation.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-3xl border border-primary/10 bg-bg-light p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Target className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 font-heading text-2xl font-semibold text-primary-dark">
                Mission
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                To deliver exceptionally reliable, error-free, and
                client-centric international visa processing and travel
                solutions. We guide our clients seamlessly through every
                layer of consular and travel compliance, maintaining strict
                data integrity and an unmatched standard of dedicated
                family-backed service.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-primary/10 bg-white p-10 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <h3 className="mt-4 font-heading text-xl font-semibold text-primary-dark">
            Institutional Rigor, Family-Owned Care
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/65">
            Every application is reviewed with the same discipline as a
            compliance audit, and the same warmth of a family business that
            genuinely wants to see you off on a great trip.
          </p>
        </div>
      </Section>
    </>
  );
}
