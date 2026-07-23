import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { SITE_INFO } from "@/lib/site-info";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Calestia Travel and Tours.",
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  {
    heading: "Acceptance of Terms",
    body: [
      "By creating an account or using Calestia Travel & Tours' services, you agree to these Terms of Service. If you do not agree, do not use our services.",
    ],
  },
  {
    heading: "Services",
    body: [
      "Calestia Travel & Tours provides Japan visa processing assistance, tour packages, and travel-related services. We act as an authorized travel agent and visa application facilitator, and we do not guarantee visa approval, as final decisions rest solely with the Embassy of Japan and VFS Global.",
    ],
  },
  {
    heading: "Client Responsibilities",
    body: [
      "You agree to provide accurate, complete, and genuine information and documents. Submission of falsified documents will result in immediate termination of your application and may be reported to the relevant authorities.",
    ],
  },
  {
    heading: "Fees and Payments",
    body: [
      "Service fees are disclosed upfront before your application begins. Fees are non-refundable once document processing has started, unless Calestia is at fault.",
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      "Calestia Travel & Tours is not liable for visa denials, delays caused by government agencies, or losses arising from incorrect information provided by the client.",
    ],
  },
  {
    heading: "Changes to Terms",
    body: [
      "We may update these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.",
    ],
  },
  {
    heading: "Governing Law",
    body: ["These terms are governed by the laws of the Republic of the Philippines."],
  },
  {
    heading: "Contact",
    body: [
      <>
        Questions about these terms? Email us at{" "}
        <a href={SITE_INFO.emailHref} className="text-primary underline">
          {SITE_INFO.email}
        </a>
        .
      </>,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service | Calestia Travel & Tours" lastUpdated="July 2026" sections={sections} />
  );
}
