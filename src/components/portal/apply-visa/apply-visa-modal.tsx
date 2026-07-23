"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { useAuth } from "@/lib/auth-context";
import { createApplicationGroup, createPayment } from "@/lib/firestore";
import { sendFormEmails } from "@/lib/email";
import { applicationTierLabel, getVisaFee, type ApplicationTier } from "@/lib/payment-config";
import { formatPeso } from "@/lib/utils";
import { ApplyVisaStepper } from "@/components/portal/apply-visa/stepper";
import {
  ApplicantFormStep,
  emptyApplicant,
  type ApplicantEntry,
} from "@/components/portal/apply-visa/applicant-form-step";
import { ApplicantSummaryStep } from "@/components/portal/apply-visa/applicant-summary-step";
import { PaymentStep } from "@/components/portal/apply-visa/payment-step";
import {
  PaymentSummaryStep,
  type ProofOfPayment,
} from "@/components/portal/apply-visa/payment-summary-step";
import { ConfirmationStep } from "@/components/portal/apply-visa/confirmation-step";
import type { PaymentMethod } from "@/lib/types";

type Step = "form" | "summary" | "payment" | "payment-summary" | "confirmation";

export function ApplyVisaModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, profile } = useAuth();
  const [step, setStep] = useState<Step>("form");
  const [applicants, setApplicants] = useState<ApplicantEntry[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const [proof, setProof] = useState<ProofOfPayment | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function reset() {
    setStep("form");
    setApplicants([]);
    setEditingIndex(null);
    setMethod(null);
    setProof(null);
    setConfirmed(false);
    setSubmitting(false);
    setError("");
  }

  function handleClose() {
    onClose();
    // Delay the reset until after the close animation-less unmount so the
    // form doesn't visibly flash empty before the modal disappears.
    setTimeout(reset, 200);
  }

  function handleSaveApplicant(applicant: ApplicantEntry) {
    if (editingIndex !== null) {
      setApplicants((prev) => prev.map((a, i) => (i === editingIndex ? applicant : a)));
    } else {
      setApplicants((prev) => [...prev, applicant]);
    }
    setEditingIndex(null);
    setStep("summary");
  }

  function handleAddApplicant() {
    setEditingIndex(null);
    setStep("form");
  }

  function handleEditApplicant(index: number) {
    setEditingIndex(index);
    setStep("form");
  }

  function handleDeleteApplicant(index: number) {
    setApplicants((prev) => prev.filter((_, i) => i !== index));
  }

  async function handlePayNow() {
    if (!user || !method || !proof) return;
    setSubmitting(true);
    setError("");
    try {
      const groupId = await createApplicationGroup(
        user.uid,
        user.email ?? "",
        applicants.map((a) => ({
          visaType: a.visaType,
          applicant: {
            firstName: a.firstName,
            lastName: a.lastName,
            gender: a.gender,
            dateOfBirth: a.dateOfBirth,
            nationality: a.nationality,
            passportNumber: a.passportNumber,
            passportExpiry: a.passportExpiry,
            travelDate: a.travelDate,
            applicationTier: a.applicationTier,
          },
        }))
      );

      const visaTypes = Array.from(new Set(applicants.map((a) => a.visaType)));
      const visaTypeLabel = visaTypes.length === 1 ? visaTypes[0] : "Multiple Visa Types";
      const fees = applicants.map((a) => getVisaFee(a.visaType, a.applicationTier as ApplicationTier));
      const amount = fees.reduce((sum, fee) => sum + fee, 0);

      await createPayment({
        userId: user.uid,
        userEmail: user.email ?? "",
        groupId,
        visaType: visaTypeLabel,
        applicantCount: applicants.length,
        amount,
        method,
        proofOfPaymentPath: proof.storagePath,
        proofFileName: proof.fileName,
      });

      const breakdown = applicants
        .map(
          (a, i) =>
            `- ${a.firstName} ${a.lastName}: ${a.visaType} (${applicationTierLabel(a.applicationTier)}), ${formatPeso(fees[i])}`
        )
        .join("\n");

      sendFormEmails({
        formType: "Visa Application Payment",
        clientName: profile?.name || user.displayName || "Client Portal user",
        clientEmail: user.email ?? "",
        clientPhone: profile?.phone ?? "",
        details: `Applicants: ${applicants.length}\n${breakdown}\nPayment Method: ${method}\nTotal Amount: ${formatPeso(amount)}`,
        nextSteps:
          "We'll verify your payment and review your application. You'll be notified once your payment status is confirmed.",
      }).catch((err) => console.error("EmailJS send failed:", err));

      setStep("confirmation");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit your application.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      {/* Applicant Details reads as "Completed" as soon as at least one
          applicant is saved and we're on the summary/payment views, even
          though the user can still go back and add or edit applicants. */}
      {step !== "form" && step !== "confirmation" && <ApplyVisaStepper currentStep={1} />}

      {step === "form" && (
        <ApplicantFormStep
          initial={editingIndex !== null ? applicants[editingIndex] : emptyApplicant}
          applicantNumber={editingIndex !== null ? editingIndex + 1 : applicants.length + 1}
          onCancel={() => (applicants.length > 0 ? setStep("summary") : handleClose())}
          onSave={handleSaveApplicant}
        />
      )}

      {step === "summary" && (
        <ApplicantSummaryStep
          applicants={applicants}
          onAddApplicant={handleAddApplicant}
          onEditApplicant={handleEditApplicant}
          onDeleteApplicant={handleDeleteApplicant}
          onBack={handleClose}
          onContinue={() => setStep("payment")}
        />
      )}

      {step === "payment" && (
        <PaymentStep
          selected={method}
          onSelect={setMethod}
          onBack={() => setStep("summary")}
          onContinue={() => setStep("payment-summary")}
        />
      )}

      {step === "payment-summary" && user && (
        <PaymentSummaryStep
          user={user}
          applicants={applicants}
          proof={proof}
          onProofChange={setProof}
          confirmed={confirmed}
          onConfirmedChange={setConfirmed}
          onBack={() => setStep("payment")}
          onPayNow={handlePayNow}
          submitting={submitting}
          error={error}
        />
      )}

      {step === "confirmation" && <ConfirmationStep onClose={handleClose} />}
    </Modal>
  );
}
