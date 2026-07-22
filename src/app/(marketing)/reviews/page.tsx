import type { Metadata } from "next";
import { Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/lib/data/testimonials";

export const metadata: Metadata = {
  title: "Reviews",
  description: "See what Calestia Travel & Tours clients say about their visa and travel experience.",
};

export default function ReviewsPage() {
  const average =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return (
    <Section>
      <SectionHeading
        eyebrow="Client Reviews"
        title="What Our Clients Say"
        description="Feedback from travelers and visa applicants who've worked with Calestia."
      />

      <div className="mx-auto mb-12 flex max-w-xs items-center justify-center gap-3 rounded-2xl border border-primary/10 bg-white px-6 py-4 text-center">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={
                i < Math.round(average)
                  ? "h-4 w-4 fill-primary text-primary"
                  : "h-4 w-4 text-primary/20"
              }
            />
          ))}
        </div>
        <span className="text-sm font-medium text-ink/70">
          {average.toFixed(1)} average rating
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={index * 80}>
            <div className="flex h-full flex-col rounded-2xl border border-primary/10 bg-white p-6">
              <div className="flex gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/75">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-primary/10 pt-4">
                <p className="text-sm font-semibold text-primary-dark">
                  {testimonial.name}
                </p>
                <p className="text-xs text-ink/50">
                  {testimonial.location} · {testimonial.service}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
