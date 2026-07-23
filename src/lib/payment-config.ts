import type { PaymentMethod } from "@/lib/types";

export const VISA_TYPE_OPTIONS = [
  "Japan Tourist Visa (Single Entry)",
  "Japan Tourist Visa (Multiple Entry)",
  "Japan Business Visa",
  "Japan Visiting Relatives",
  "Japan Visiting Friends",
] as const;

export type ApplicationTier = "standard" | "premium";

export const APPLICATION_TYPE_OPTIONS: { value: ApplicationTier; label: string }[] = [
  { value: "standard", label: "Standard Application" },
  { value: "premium", label: "Premium Application" },
];

// Per-applicant fee, by visa type and service tier. Confirmed with Calestia:
// Tourist Visa (Single Entry) and Tourist Visa (Multiple Entry).
//
// TODO: the three entries below are PLACEHOLDER figures (copied from the
// Multiple Entry tourist visa fee) and have NOT been confirmed by the
// business owner. Update these three before accepting real payments for
// Business / Visiting Relatives / Visiting Friends visas.
export const VISA_FEES: Record<
  (typeof VISA_TYPE_OPTIONS)[number],
  { standard: number; premium: number }
> = {
  "Japan Tourist Visa (Single Entry)": { standard: 2700, premium: 7200 },
  "Japan Tourist Visa (Multiple Entry)": { standard: 3000, premium: 7500 },
  "Japan Business Visa": { standard: 3000, premium: 7500 }, // TODO: unconfirmed placeholder
  "Japan Visiting Relatives": { standard: 3000, premium: 7500 }, // TODO: unconfirmed placeholder
  "Japan Visiting Friends": { standard: 3000, premium: 7500 }, // TODO: unconfirmed placeholder
};

export function getVisaFee(visaType: string, tier: ApplicationTier): number {
  const fees = VISA_FEES[visaType as (typeof VISA_TYPE_OPTIONS)[number]];
  return fees ? fees[tier] : 0;
}

export function applicationTierLabel(tier: string): string {
  return APPLICATION_TYPE_OPTIONS.find((option) => option.value === tier)?.label ?? tier;
}

export const PAYMENT_METHODS: {
  method: PaymentMethod;
  accountNumber: string;
  accountName: string;
}[] = [
  { method: "GCash", accountNumber: "09603041887", accountName: "PR***E KI*R W** V." },
  { method: "Maya", accountNumber: "09911509724", accountName: "Richard Valenzuela" },
  { method: "Bank Transfer", accountNumber: "0107 4487 8867", accountName: "Prince Kier Win Valenzuela" },
];
