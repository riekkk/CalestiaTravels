import type { PaymentMethod } from "@/lib/types";

// TODO: confirm this figure with Calestia before going live, then update
// here. This single constant drives every fee shown in the Apply a Visa
// flow (Payment Summary + confirmation emails).
export const VISA_ASSISTANCE_FEE_PER_APPLICANT = 1500;

export const VISA_TYPE_OPTIONS = [
  "Japan Tourist Visa (Single Entry)",
  "Japan Tourist Visa (Multiple Entry)",
  "Japan Business Visa",
  "Japan Visiting Relatives",
  "Japan Visiting Friends",
] as const;

export const PAYMENT_METHODS: {
  method: PaymentMethod;
  accountNumber: string;
  accountName: string;
}[] = [
  { method: "GCash", accountNumber: "09603041887", accountName: "PR***E KI*R W** V." },
  { method: "Maya", accountNumber: "09911509724", accountName: "Richard Valenzuela" },
  { method: "Bank Transfer", accountNumber: "0107 4487 8867", accountName: "Prince Kier Win Valenzuela" },
];
