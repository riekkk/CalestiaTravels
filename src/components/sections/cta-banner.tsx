import { ButtonLink } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="bg-primary-dark">
      <div className="container-page py-20 text-center text-white">
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl">
          Ready to plan your next journey?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">
          Whether it&apos;s your Japan visa or your next island getaway, the
          Calestia team is ready to guide you through every step.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/contact" size="lg">
            Talk to Our Team
          </ButtonLink>
          <ButtonLink href="/visa" variant="outline" size="lg">
            Start Visa Application
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
