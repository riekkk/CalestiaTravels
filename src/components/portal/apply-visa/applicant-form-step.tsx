"use client";

import { useState, type FormEvent } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/form-fields";
import { APPLICATION_TYPE_OPTIONS, VISA_TYPE_OPTIONS } from "@/lib/payment-config";
import type { ApplicantDetails } from "@/lib/types";

export type ApplicantEntry = ApplicantDetails & { visaType: string };

export const emptyApplicant: ApplicantEntry = {
  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  nationality: "",
  passportNumber: "",
  passportExpiry: "",
  travelDate: "",
  visaType: "",
  applicationTier: "",
};

export function ApplicantFormStep({
  initial,
  applicantNumber,
  onCancel,
  onSave,
}: {
  initial: ApplicantEntry;
  applicantNumber: number;
  onCancel: () => void;
  onSave: (applicant: ApplicantEntry) => void;
}) {
  const [form, setForm] = useState<ApplicantEntry>(initial);

  function patch(fields: Partial<ApplicantEntry>) {
    setForm((prev) => ({ ...prev, ...fields }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div>
      <h2 className="font-heading text-2xl font-semibold text-primary-dark">
        Apply for a Visa
      </h2>
      <p className="mt-1 text-sm text-ink/60">
        Complete the fields exactly as they appear on your passport.
      </p>

      <div className="mt-5 flex items-start gap-3 rounded-2xl bg-amber-50 p-4 text-amber-800">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        <p className="text-sm">
          <span className="font-semibold">IMPORTANT:</span> Please enter the
          information exactly as it appears on the photo page of your
          passport. We may be unable to process your application if the
          details do not match.
        </p>
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-primary/70">
        Applicant {applicantNumber}
      </p>

      <form onSubmit={handleSubmit} className="mt-3 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="av-firstName">First Name</Label>
            <Input
              id="av-firstName"
              required
              value={form.firstName}
              onChange={(e) => patch({ firstName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="av-lastName">Last Name</Label>
            <Input
              id="av-lastName"
              required
              value={form.lastName}
              onChange={(e) => patch({ lastName: e.target.value })}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="av-gender">Gender</Label>
            <Select
              id="av-gender"
              required
              value={form.gender}
              onChange={(e) => patch({ gender: e.target.value })}
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="av-dob">Date of Birth</Label>
            <Input
              id="av-dob"
              type="date"
              required
              value={form.dateOfBirth}
              onChange={(e) => patch({ dateOfBirth: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="av-nationality">Current Nationality</Label>
          <Input
            id="av-nationality"
            required
            placeholder="Filipino"
            value={form.nationality}
            onChange={(e) => patch({ nationality: e.target.value })}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="av-passportNumber">Passport Number</Label>
            <Input
              id="av-passportNumber"
              required
              value={form.passportNumber}
              onChange={(e) => patch({ passportNumber: e.target.value.toUpperCase() })}
            />
          </div>
          <div>
            <Label htmlFor="av-passportExpiry">Passport Expiry Date</Label>
            <Input
              id="av-passportExpiry"
              type="date"
              required
              value={form.passportExpiry}
              onChange={(e) => patch({ passportExpiry: e.target.value })}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="av-travelDate">Travel Date</Label>
            <Input
              id="av-travelDate"
              type="date"
              required
              value={form.travelDate}
              onChange={(e) => patch({ travelDate: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="av-visaType">Type of Visa</Label>
            <Select
              id="av-visaType"
              required
              value={form.visaType}
              onChange={(e) => patch({ visaType: e.target.value })}
            >
              <option value="" disabled>
                Select visa type
              </option>
              {VISA_TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="av-applicationTier">Application Type</Label>
          <Select
            id="av-applicationTier"
            required
            value={form.applicationTier}
            onChange={(e) => patch({ applicationTier: e.target.value })}
          >
            <option value="" disabled>
              Select application type
            </option>
            {APPLICATION_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
