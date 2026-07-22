import { Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/lib/data/testimonials";

export function Testimonials() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Testimonials"
        title="What Our Clients Say"
        description="Real feedback from travelers and visa applicants we've worked with."
      />
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
