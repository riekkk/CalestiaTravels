import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Calestia Travel & Tours for visa assistance or tour package inquiries.",
};

const contactDetails = [
  {
    icon: Phone,
    label: "Phone",
    value: "0960 304 1887",
    href: "tel:+639603041887",
  },
  {
    icon: Mail,
    label: "Email",
    value: "Calestia.assistance@gmail.com",
    href: "mailto:Calestia.assistance@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "General Trias, Cavite, Philippines",
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
            <div className="rounded-2xl border border-primary/10 bg-primary-dark p-5 text-white">
              <p className="text-xs uppercase tracking-wide text-white/60">Facebook</p>
              <p className="mt-1 text-sm font-medium">Calestia Travel and Tours Services</p>
              <p className="mt-2 text-xs text-white/60">
                Search us on Facebook for updates and announcements.
              </p>
            </div>
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
