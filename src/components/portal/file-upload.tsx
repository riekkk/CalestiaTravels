"use client";

import { useRef, useState, type DragEvent } from "react";
import { Clock, Loader2, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { DOCUMENT_UPLOADS_ENABLED } from "@/lib/feature-flags";

export function FileUpload({
  onUpload,
}: {
  onUpload: (file: File) => Promise<void>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      await onUpload(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  }

  if (!DOCUMENT_UPLOADS_ENABLED) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/15 bg-bg-light px-6 py-10 text-center">
        <Clock className="h-6 w-6 text-primary/50" strokeWidth={1.5} />
        <p className="text-sm font-medium text-primary-dark/70">
          Document Uploads: Coming Soon
        </p>
        <p className="text-xs text-ink/45">
          We&apos;re finishing setup on secure file storage. In the meantime,
          you can email documents to{" "}
          <a href="mailto:Calestia.assistance@gmail.com" className="underline">
            Calestia.assistance@gmail.com
          </a>
          .
        </p>
        <button
          type="button"
          disabled
          className="mt-2 cursor-not-allowed rounded-full bg-primary/10 px-4 py-2 text-xs font-medium text-primary/50"
        >
          Attach File
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors",
          dragging ? "border-primary bg-primary/5" : "border-primary/20 bg-white hover:border-primary/40"
        )}
      >
        {uploading ? (
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        ) : (
          <UploadCloud className="h-6 w-6 text-primary" strokeWidth={1.5} />
        )}
        <p className="text-sm font-medium text-primary-dark">
          {uploading ? "Uploading..." : "Drag & drop a file, or click to browse"}
        </p>
        <p className="text-xs text-ink/45">PDF, JPG, or PNG, max 10MB</p>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
