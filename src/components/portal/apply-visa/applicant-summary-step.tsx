"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate, formatPeso } from "@/lib/utils";
import { applicationTierLabel, getVisaFee, type ApplicationTier } from "@/lib/payment-config";
import type { ApplicantEntry } from "@/components/portal/apply-visa/applicant-form-step";

const PASSPORT_MASK = "••••••••";

export function ApplicantSummaryStep({
  applicants,
  onAddApplicant,
  onEditApplicant,
  onDeleteApplicant,
  onBack,
  onContinue,
}: {
  applicants: ApplicantEntry[];
  onAddApplicant: () => void;
  onEditApplicant: (index: number) => void;
  onDeleteApplicant: (index: number) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-semibold text-primary-dark">
        Applicant Details
      </h2>
      <p className="mt-1 text-sm text-ink/60">
        Review your applicant{applicants.length === 1 ? "" : "s"} before proceeding to payment.
      </p>

      <div className="mt-6 space-y-4">
        {applicants.map((applicant, index) => (
          <div
            key={index}
            className="relative rounded-2xl border border-primary/10 bg-bg-light p-5"
          >
            <div className="absolute right-4 top-4 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onEditApplicant(index)}
                aria-label="Edit applicant"
                className="flex h-8 w-8 items-center justify-center rounded-full text-primary/60 transition-colors hover:bg-white hover:text-primary"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onDeleteApplicant(index)}
                aria-label="Delete applicant"
                className="flex h-8 w-8 items-center justify-center rounded-full text-red-500/70 transition-colors hover:bg-white hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/60">
              Applicant {index + 1}
            </p>
            <p className="mt-1 font-heading text-lg font-semibold text-primary-dark">
              {applicant.firstName} {applicant.lastName}
            </p>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-xs text-ink/45">Visa Type</dt>
                <dd className="text-ink/75">{applicant.visaType}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink/45">Application Type</dt>
                <dd className="text-ink/75">
                  {applicant.applicationTier ? applicationTierLabel(applicant.applicationTier) : "-"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-ink/45">Fee</dt>
                <dd className="text-ink/75">
                  {applicant.visaType && applicant.applicationTier
                    ? formatPeso(getVisaFee(applicant.visaType, applicant.applicationTier as ApplicationTier))
                    : "-"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-ink/45">Passport Number</dt>
                <dd className="text-ink/75">{PASSPORT_MASK}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink/45">Travel Date</dt>
                <dd className="text-ink/75">
                  {applicant.travelDate ? formatDate(new Date(applicant.travelDate).getTime()) : "-"}
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onAddApplicant}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/25 py-4 text-sm font-medium text-primary transition-colors hover:border-primary/50 hover:bg-primary/5"
      >
        <Plus className="h-4 w-4" /> Add Applicant
      </button>

      <div className="mt-8 flex items-center justify-between">
        <Button type="button" variant="ghost" onClick={onBack}>
          Go Back
        </Button>
        <Button type="button" onClick={onContinue} disabled={applicants.length === 0}>
          Continue
        </Button>
      </div>
    </div>
  );
}
