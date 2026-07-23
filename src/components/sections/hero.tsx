import { FileCheck2, MapPinned, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary-dark text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, white 0, transparent 35%), radial-gradient(circle at 85% 15%, white 0, transparent 30%), radial-gradient(circle at 50% 100%, #3B5583 0, transparent 60%)",
        }}
      />
      <div className="container-page relative py-24 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Where Every Japan Journey Begins
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            We simplify the Japanese visa application process, guiding you
            every step of the way with expert assistance, accurate
            documentation, and a stress-free experience.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/tours" size="lg">
              Explore Tour Packages
            </ButtonLink>
            <ButtonLink href="/visa" variant="outline" size="lg">
              Start Visa Application
            </ButtonLink>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              icon: FileCheck2,
              title: "Japan Visa Assistance",
              desc: "Document review, checklists & filing",
            },
            {
              icon: MapPinned,
              title: "Tour Packages",
              desc: "Curated domestic getaways",
            },
            {
              icon: ShieldCheck,
              title: "High Approval Rate",
              desc: "Meticulous, transparent process",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur-sm"
            >
              <item.icon className="h-5 w-5 text-white/80" strokeWidth={1.75} />
              <p className="mt-3 text-sm font-semibold">{item.title}</p>
              <p className="mt-1 text-xs text-white/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
