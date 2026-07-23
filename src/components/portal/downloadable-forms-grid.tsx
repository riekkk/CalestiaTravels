import { Download } from "lucide-react";
import { CALESTIA_FORMS } from "@/lib/data/forms";

export function DownloadableFormsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {CALESTIA_FORMS.map((form) => (
        <div
          key={form.id}
          className="flex flex-col rounded-2xl border border-primary/10 bg-white p-5"
        >
          <span className="inline-flex w-fit items-center rounded-md bg-primary/10 px-2 py-1 text-[11px] font-semibold tracking-wide text-primary">
            {form.fileType}
          </span>
          <p className="mt-3 font-medium text-primary-dark">{form.name}</p>
          <p className="mt-1 text-sm text-ink/60">{form.description}</p>
          <p className="mt-2 text-xs text-ink/40">{form.fileSize}</p>
          <a
            href={`/forms/${form.fileName}`}
            download={form.fileName}
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            <Download className="h-4 w-4" strokeWidth={1.75} />
            Download
          </a>
        </div>
      ))}
    </div>
  );
}
