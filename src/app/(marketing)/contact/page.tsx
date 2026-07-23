import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { ContactForm } from "@/components/forms/contact-form";
import { SITE_INFO } from "@/lib/site-info";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Calestia Travel and Tours for visa assistance or tour package inquiries.",
  alternates: { canonical: "/contact" },
};

const contactDetails = [
  {
    icon: Phone,
    label: "Phone",
    value: SITE_INFO.phone,
    href: SITE_INFO.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: SITE_INFO.email,
    href: SITE_INFO.emailHref,
  },
  {
    icon: MapPin,
    label: "Location",
    value: SITE_INFO.address,
  },
];

export default function ContactPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Contact Us"
        title="We're Here to Help"
        description="Questions about a visa application or a tour package? Reach out and our team will respond promptly."
      />

      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {contactDetails.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-2xl border border-primary/10 bg-white p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-ink/50">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-medium text-primary-dark">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-primary-dark">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
            <a
              href={SITE_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border border-primary/10 bg-primary-dark p-5 text-white transition-opacity hover:opacity-90"
            >
              <p className="text-xs uppercase tracking-wide text-white/60">Facebook</p>
              <p className="mt-1 text-sm font-medium">{SITE_INFO.facebookName}</p>
              <p className="mt-2 text-xs text-white/60">
                Follow us on Facebook for updates and announcements.
              </p>
            </a>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-3xl border border-primary/10 bg-white p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
