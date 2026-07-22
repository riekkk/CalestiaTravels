import { Download } from "lucide-react";
import { downloadableForms } from "@/lib/data/visa-types";

export function DownloadableForms() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {downloadableForms.map((form) => (
        <a
          key={form.fileName}
          href={`/forms/${form.fileName}`}
          download
          className="group flex items-start gap-4 rounded-2xl border border-primary/10 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-12px_rgba(40,64,94,0.3)]"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Download className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div>
            <p className="font-medium text-primary-dark">{form.name}</p>
            <p className="mt-1 text-sm text-ink/60">{form.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
