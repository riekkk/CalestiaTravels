import type { Metadata } from "next";
import { Globe2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "International Tours",
  description: "Calestia's international tour packages are coming soon.",
};

export default function InternationalToursPage() {
  return (
    <Section className="flex flex-col items-center text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Globe2 className="h-8 w-8" strokeWidth={1.5} />
      </span>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        International Tours
      </p>
      <h1 className="mt-3 font-heading text-3xl font-semibold text-primary-dark sm:text-4xl">
        Coming Soon
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink/65">
        We&apos;re building out international getaways to pair with our Japan
        visa expertise. In the meantime, let us help you with your Japan
        visa application, or browse our current domestic tour packages.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/visa">Explore Visa Assistance</ButtonLink>
        <ButtonLink href="/tours/domestic" variant="secondary">
          Browse Domestic Tours
        </ButtonLink>
      </div>
    </Section>
  );
}
