import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { Accordion, type AccordionItemData } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Calestia's Japan visa assistance and tour packages.",
  alternates: { canonical: "/faq" },
};

const visaFaqs: AccordionItemData[] = [
  {
    question: "How long does visa processing take?",
    answer:
      "Average processing time is 5–7 working days once your application is filed, though this can vary depending on VFS and Embassy timelines.",
  },
  {
    question: "When should I submit my application?",
    answer:
      "If you don't have a confirmed travel date yet, we recommend submitting your documents at least 2–3 months before your intended departure to allow ample time for processing and resolving any issues.",
  },
  {
    question: "Can I submit a handwritten application form?",
    answer:
      "No. All application forms must be typed (computerized), including Page 2 — Inviter/Guarantor information — and the date. Handwritten forms will not be accepted and must be resubmitted.",
  },
  {
    question: "What if I don't have an inviter or guarantor in Japan?",
    answer: "Type “N/A” in those fields rather than leaving them blank.",
  },
  {
    question: "What paper size should my documents be printed on?",
    answer:
      "All forms and authorization letters must be printed on A4-size paper — VFS is strict about paper size compliance.",
  },
  {
    question: "Can I make corrections on my application form?",
    answer: "No erasures or corrections are allowed on the application form — a mistake means reprinting it.",
  },
  {
    question: "How many authorization letters do I need to submit?",
    answer: "Applicants must submit two (2) sets of authorization letters.",
  },
  {
    question: "Which visa type should I apply for?",
    answer:
      "It depends on your purpose of travel — tourism, visiting relatives, visiting friends, being the spouse/child of a Japanese national, or holding student/worker/dependent status. Visit our Visa Assistance page to see the full checklist for each category.",
  },
];

const tourFaqs: AccordionItemData[] = [
  {
    question: "Is airfare included in your tour packages?",
    answer:
      "It depends on the package — the Dumaguete & Siquijor Getaway includes roundtrip airfare from Manila. Check each package's inclusions list for details.",
  },
  {
    question: "How many people are needed for a departure to push through?",
    answer:
      "Group sizes vary per package — the Dumaguete & Siquijor Getaway runs with 10–13 guests per departure.",
  },
  {
    question: "Can I customize an itinerary for my group?",
    answer:
      "Yes — reach out to our team through the Contact page and we'll work with you on a private or customized itinerary.",
  },
];

const bookingFaqs: AccordionItemData[] = [
  {
    question: "How do I book a tour or start a visa application?",
    answer:
      "Create a free Client Portal account to submit a visa application or booking request, upload your documents, and track status in one place — or reach out directly via Contact.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "Please confirm current payment options with our team when you book — we'll walk you through it directly.",
  },
  {
    question: "Is there a cancellation or refund policy?",
    answer:
      "Cancellation terms are communicated at the time of booking. Message our team if you need to make changes to a confirmed booking or application.",
  },
];

const portalFaqs: AccordionItemData[] = [
  {
    question: "Do I need an account to apply for a visa?",
    answer:
      "It's recommended — a Client Portal account lets you securely upload documents, track your application status, and receive updates in one place.",
  },
  {
    question: "How do I check my application status?",
    answer:
      "Log in to your Client Portal dashboard — your applications, uploaded documents, and status updates are all visible there.",
  },
];

const groups: { title: string; items: AccordionItemData[] }[] = [
  { title: "Visa Assistance", items: visaFaqs },
  { title: "Tour Packages", items: tourFaqs },
  { title: "Booking & Payments", items: bookingFaqs },
  { title: "Client Portal", items: portalFaqs },
];

export default function FaqPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Everything you need to know about our visa assistance and tour packages."
      />
      <div className="mx-auto max-w-3xl space-y-12">
        {groups.map((group) => (
          <div key={group.title}>
            <h2 className="mb-4 font-heading text-xl font-semibold text-primary-dark">
              {group.title}
            </h2>
            <Accordion items={group.items} />
          </div>
        ))}
      </div>
    </Section>
  );
}
