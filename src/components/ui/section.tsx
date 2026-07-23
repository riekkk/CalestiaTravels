import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-28", className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  // Defaults to h2 (a subsection under the page's own h1). Pages where this
  // is the first and only heading — no separate h1 elsewhere — should pass
  // as="h1" so the page still has exactly one, per SEO/a11y heading rules.
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={cn(
        "mb-12 max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
      )}
      <Heading className="font-heading text-3xl font-semibold text-primary-dark sm:text-4xl">
        {title}
      </Heading>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-ink/70">{description}</p>
      )}
    </div>
  );
}
