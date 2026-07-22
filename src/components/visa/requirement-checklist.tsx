import { FileText } from "lucide-react";
import type { VisaDocument } from "@/lib/types";

export function RequirementChecklist({ documents }: { documents: VisaDocument[] }) {
  return (
    <ol className="space-y-3">
      {documents.map((doc, index) => (
        <li
          key={doc.name}
          className="flex gap-4 rounded-2xl border border-primary/10 bg-white p-5"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
            {index + 1}
          </span>
          <div>
            <p className="flex items-center gap-2 font-medium text-primary-dark">
              <FileText className="h-4 w-4 shrink-0 text-primary/50" />
              {doc.name}
            </p>
            {doc.detail && (
              <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{doc.detail}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
