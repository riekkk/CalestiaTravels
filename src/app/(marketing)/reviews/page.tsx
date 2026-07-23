import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { ReviewsListClient } from "@/components/reviews/reviews-list-client";

export const metadata: Metadata = {
  title: "Reviews",
  description: "See what Calestia Travel and Tours clients say about their visa and travel experience.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <Section>
      <SectionHeading
        as="h1"
        eyebrow="Client Reviews"
        title="What Our Clients Say"
        description="Feedback from travelers and visa applicants who've worked with Calestia."
      />
      <ReviewsListClient />
    </Section>
  );
}
