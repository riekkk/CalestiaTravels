"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PAYMENT_METHODS } from "@/lib/payment-config";
import type { PaymentMethod } from "@/lib/types";

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable, ignore silently.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex w-full items-center justify-between gap-2 rounded-xl bg-white px-3 py-2 text-left transition-colors hover:bg-bg-light"
    >
      <span>
        <span className="block text-[11px] text-ink/45">{label}</span>
        <span className="block text-sm font-medium text-primary-dark">{value}</span>
      </span>
      {copied ? (
        <Check className="h-4 w-4 shrink-0 text-emerald-600" />
      ) : (
        <Copy className="h-4 w-4 shrink-0 text-ink/30" />
      )}
    </button>
  );
}

export function PaymentStep({
  selected,
  onSelect,
  onBack,
  onContinue,
}: {
  selected: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-semibold text-primary-dark">Payment</h2>
      <p className="mt-1 text-sm text-ink/60">Choose your preferred payment method.</p>

      <div className="mt-6 space-y-3">
        {PAYMENT_METHODS.map((option) => {
          const isSelected = selected === option.method;
          return (
            <div
              key={option.method}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(option.method)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelect(option.method);
              }}
              className={cn(
                "cursor-pointer rounded-2xl border-2 p-4 transition-colors",
                isSelected ? "border-primary bg-primary/5" : "border-primary/10 bg-white hover:border-primary/30"
              )}
            >
              <div className="flex items-center justify-between">
                <p className="font-heading text-base font-semibold text-primary-dark">
                  {option.method}
                </p>
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                    isSelected ? "border-primary bg-primary" : "border-primary/25"
                  )}
                >
                  {isSelected && <Check className="h-3 w-3 text-white" />}
                </span>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <CopyField label="Account Number" value={option.accountNumber} />
                <CopyField label="Account Name" value={option.accountName} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Button type="button" variant="ghost" onClick={onBack}>
          Go Back
        </Button>
        <Button type="button" onClick={onContinue} disabled={!selected}>
          Continue
        </Button>
      </div>
    </div>
  );
}
