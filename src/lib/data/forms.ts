import type { ChecklistItem, DownloadableForm } from "@/lib/types";

// Drives the "Forms & Checklist" tab on the client portal's My Documents
// page (src/app/portal/(app)/documents/page.tsx). Every entry must have a
// matching file in /public/forms — add the PDF/DOCX there first, then add
// its entry here.
export const CALESTIA_FORMS: DownloadableForm[] = [
  {
    id: "visa-application-form",
    name: "Visa Application Form (Japan)",
    description: "The standard Japan visa application form, required for every visa type.",
    fileName: "visa-application-form.pdf",
    fileType: "PDF",
    fileSize: "267 KB",
  },
  {
    id: "multiple-entry-request-form",
    name: "Multiple-Entry Request Form",
    description: "Required when applying for a multiple-entry temporary visitor visa.",
    fileName: "multiple-entry-request-form.pdf",
    fileType: "PDF",
    fileSize: "297 KB",
  },
  {
    id: "authorization-letter",
    name: "Authorization Letter",
    description: "Authorizes Calestia to file your application and release your passport on your behalf.",
    fileName: "authorization-letter.pdf",
    fileType: "PDF",
    fileSize: "389 KB",
  },
  {
    id: "guarantee-letter",
    name: "Letter of Guarantee",
    description: "For guarantors covering an applicant's expenses and return travel.",
    fileName: "guarantee-letter.pdf",
    fileType: "PDF",
    fileSize: "239 KB",
  },
  {
    id: "itinerary-format",
    name: "Travel Itinerary Format",
    description: "Template for listing your day-by-day activity plan and accommodation in Japan.",
    fileName: "itinerary-format.pdf",
    fileType: "PDF",
    fileSize: "600 KB",
  },
  {
    id: "tourist-visa-checklist-single",
    name: "Tourist Visa Checklist (Single Entry)",
    description: "Printable checklist of required documents for a single-entry tourist visa.",
    fileName: "tourist-visa-checklist-(single).pdf",
    fileType: "PDF",
    fileSize: "165 KB",
  },
  {
    id: "tourist-visa-checklist-multiple",
    name: "Tourist Visa Checklist (Multiple Entry)",
    description: "Printable checklist of required documents for a multiple-entry tourist visa.",
    fileName: "tourist-visa-checklist-(multiple).pdf",
    fileType: "PDF",
    fileSize: "203 KB",
  },
];

// Standard Japan tourist visa document requirements, tracked per-client as
// an interactive checklist (separate from the per-application admin
// checklist in VisaType.requiredDocuments).
export const VISA_REQUIREMENTS_CHECKLIST: ChecklistItem[] = [
  { id: "valid-passport", label: "Valid Passport (6+ months validity)" },
  { id: "passport-photo", label: "Passport-size Photo (white background, recent)" },
  { id: "visa-application-form-filled", label: "Filled Japan Visa Application Form" },
  { id: "bank-certificate", label: "Bank Certificate (last 6 months, showing ADB)" },
  { id: "income-tax-return", label: "Income Tax Return (ITR) — latest year" },
  {
    id: "certificate-of-employment",
    label: "Certificate of Employment (COE) with position, salary, and length of employment",
  },
  { id: "bank-statements", label: "Personal Bank Statements (last 3 months)" },
  { id: "flight-booking", label: "Confirmed Round-trip Flight Booking" },
  { id: "hotel-booking", label: "Hotel Booking Confirmation" },
  { id: "detailed-itinerary", label: "Detailed Itinerary" },
];
