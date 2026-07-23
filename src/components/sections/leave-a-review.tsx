import { Section, SectionHeading } from "@/components/ui/section";
import { ReviewForm } from "@/components/forms/review-form";

export function LeaveAReview() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Reviews"
        title="Leave a Review"
        description="Worked with Calestia recently? We'd love to hear about your experience."
      />
      <div className="mx-auto max-w-xl rounded-3xl border border-primary/10 bg-white p-6 sm:p-8">
        <ReviewForm />
      </div>
    </Section>
  );
}
