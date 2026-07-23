"use client";

import { useRef, useState } from "react";
import { FileText, Loader2, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fileToProofOfPayment } from "@/lib/file-to-data-url";
import { VISA_ASSISTANCE_FEE_PER_APPLICANT } from "@/lib/payment-config";
import { formatPeso } from "@/lib/utils";
import type { ApplicantEntry } from "@/components/portal/apply-visa/applicant-form-step";

export type ProofOfPayment = { dataUrl: string; fileName: string };

export function PaymentSummaryStep({
  applicants,
  proof,
  onProofChange,
  confirmed,
  onConfirmedChange,
  onBack,
  onPayNow,
  submitting,
  error,
}: {
  applicants: ApplicantEntry[];
  proof: ProofOfPayment | null;
  onProofChange: (proof: ProofOfPayment | null) => void;
  confirmed: boolean;
  onConfirmedChange: (value: boolean) => void;
  onBack: () => void;
  onPayNow: () => void;
  submitting: boolean;
  error: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const visaTypes = Array.from(new Set(applicants.map((a) => a.visaType)));
  const visaTypeLabel = visaTypes.length === 1 ? visaTypes[0] : "Multiple Visa Types";
  const total = applicants.length * VISA_ASSISTANCE_FEE_PER_APPLICANT;

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploadError("");
    setUploading(true);
    try {
      const result = await fileToProofOfPayment(file);
      onProofChange(result);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  const canPay = Boolean(proof) && confirmed && !submitting;

  return (
    <div>
      <h2 className="font-heading text-2xl font-semibold text-primary-dark">
        Payment Summary
      </h2>
      <p className="mt-1 text-sm text-ink/60">
        Review your total and upload your proof of payment.
      </p>

      <div className="mt-6 space-y-2 rounded-2xl border border-primary/10 bg-bg-light p-5 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-ink/55">Visa Type</span>
          <span className="font-medium text-primary-dark">{visaTypeLabel}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-ink/55">Number of Applicants</span>
          <span className="font-medium text-primary-dark">{applicants.length}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-ink/55">Visa Assistance Fee</span>
          <span className="font-medium text-primary-dark">
            {formatPeso(VISA_ASSISTANCE_FEE_PER_APPLICANT)} &times; {applicants.length}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-primary/10 pt-3">
          <span className="font-semibold text-primary-dark">Total Amount</span>
          <span className="font-heading text-lg font-semibold text-primary-dark">
            {formatPeso(total)}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-sm font-medium text-primary-dark">Upload Proof of Payment</p>
        {proof ? (
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-primary/15 bg-white p-4">
            <div className="flex items-center gap-3 overflow-hidden">
              {proof.dataUrl.startsWith("data:image") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={proof.dataUrl}
                  alt="Proof of payment preview"
                  className="h-12 w-12 shrink-0 rounded-lg object-cover"
                />
              ) : (
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </span>
              )}
              <span className="truncate text-sm text-ink/70">{proof.fileName}</span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="text-xs font-medium text-primary underline"
              >
                Re-upload
              </button>
              <button
                type="button"
                onClick={() => onProofChange(null)}
                aria-label="Remove file"
                className="flex h-7 w-7 items-center justify-center rounded-full text-ink/40 hover:bg-bg-light hover:text-ink"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/20 bg-white px-6 py-8 text-center transition-colors hover:border-primary/40"
          >
            {uploading ? (
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            ) : (
              <UploadCloud className="h-6 w-6 text-primary" strokeWidth={1.5} />
            )}
            <span className="text-sm font-medium text-primary-dark">
              {uploading ? "Processing..." : "Upload Proof of Payment"}
            </span>
            <span className="text-xs text-ink/45">Image or PDF</span>
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*,.pdf"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        {uploadError && <p className="mt-2 text-sm text-red-600">{uploadError}</p>}
      </div>

      <label className="mt-6 flex items-start gap-2.5 text-sm text-ink/70">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => onConfirmedChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-primary/30 text-primary focus:ring-primary/30"
        />
        I confirm that all information provided is accurate.
      </label>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-8 flex items-center justify-between">
        <Button type="button" variant="ghost" onClick={onBack} disabled={submitting}>
          Go Back
        </Button>
        <Button type="button" onClick={onPayNow} disabled={!canPay}>
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Pay Now
        </Button>
      </div>
    </div>
  );
}
