import {
  BadgeCheck,
  Headset,
  Lock,
  PlaneTakeoff,
  ReceiptText,
  Sparkles,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const reasons = [
  {
    icon: Sparkles,
    title: "Specialized in Japan",
    description:
      "We know Japan visa requirements inside out. No guesswork, no delays, no surprises.",
  },
  {
    icon: PlaneTakeoff,
    title: "Fast Turnaround",
    description:
      "We process applications efficiently, keeping you informed at every stage of the journey.",
  },
  {
    icon: Headset,
    title: "Dedicated Support",
    description:
      "Personal assistance via chat, email, or call. A real human answers your questions.",
  },
  {
    icon: Lock,
    title: "Secure & Confidential",
    description:
      "Your documents and personal information are handled with the highest level of security.",
  },
  {
    icon: BadgeCheck,
    title: "High Approval Rate",
    description:
      "Our meticulous document review process keeps our client approval rate consistently high.",
  },
  {
    icon: ReceiptText,
    title: "Transparent Pricing",
    description:
      "No hidden fees. Clear service rates discussed upfront before we begin your application.",
  },
];

export function WhyChooseCalestia() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Why Calestia"
        title="Why Choose Calestia"
        description="A family-backed team with an institutional level of rigor: precise, transparent, and genuinely reachable."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, index) => (
          <Reveal key={reason.title} delay={index * 60}>
            <div className="h-full rounded-2xl border border-primary/10 bg-white p-6 transition-shadow hover:shadow-[0_12px_30px_-14px_rgba(40,64,94,0.35)]">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <reason.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-primary-dark">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                {reason.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
