import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { SITE_INFO } from "@/lib/site-info";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Calestia Travel and Tours.",
  alternates: { canonical: "/privacy" },
};

const sections: LegalSection[] = [
  {
    heading: "Information We Collect",
    body: [
      "When you create an account or submit an application, we collect your name, email address, phone number, and any documents or information you provide as part of a visa or travel service application.",
    ],
  },
  {
    heading: "How We Use Your Information",
    body: [
      "We use your information solely to process your visa or travel service request and communicate with you about your application. We do not use your information for any unrelated purpose.",
    ],
  },
  {
    heading: "Information Sharing",
    body: [
      "We do not sell, rent, or trade your personal information. Your information may be shared only with relevant government agencies or visa processing centers (such as the Embassy of Japan or VFS Global) as necessary to process your application, with your knowledge as part of that process.",
    ],
  },
  {
    heading: "Data Security",
    body: [
      "Your data is stored securely using Firebase (Google Cloud infrastructure). Access is restricted to authorized Calestia staff only.",
    ],
  },
  {
    heading: "Data Retention",
    body: [
      "We retain your information for as long as necessary to provide our services and comply with legal or regulatory requirements.",
    ],
  },
  {
    heading: "Your Rights",
    body: [
      <>
        Under the Philippine Data Privacy Act of 2012 (RA 10173), you have the right to
        access, correct, or request deletion of your personal information, and to
        withdraw consent at any time. To exercise these rights, contact us at{" "}
        <a href={SITE_INFO.emailHref} className="text-primary underline">
          {SITE_INFO.email}
        </a>
        .
      </>,
    ],
  },
  {
    heading: "Cookies",
    body: [
      "Our website uses essential cookies only to support login sessions and basic site functionality. We do not use cookies for advertising or third-party tracking.",
    ],
  },
  {
    heading: "Contact",
    body: [
      <>
        Questions about this policy? Email us at{" "}
        <a href={SITE_INFO.emailHref} className="text-primary underline">
          {SITE_INFO.email}
        </a>{" "}
        or call{" "}
        <a href={SITE_INFO.phoneHref} className="text-primary underline">
          {SITE_INFO.phone}
        </a>
        .
      </>,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy | Calestia Travel & Tours" lastUpdated="July 2026" sections={sections} />
  );
}
