import Link from "next/link";
import { ArrowRight, FileCheck2 } from "lucide-react";
import type { VisaType } from "@/lib/types";
import { Card } from "@/components/ui/card";

export function VisaTypeCard({ visa }: { visa: VisaType }) {
  return (
    <Card className="group flex flex-col p-6 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(40,64,94,0.3)]">
      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <FileCheck2 className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <h3 className="font-heading text-lg font-semibold text-primary-dark">
        {visa.shortTitle}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">{visa.summary}</p>
      <Link
        href={`/visa/${visa.slug}`}
        className="mt-5 flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1"
      >
        View Requirements
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Card>
  );
}
