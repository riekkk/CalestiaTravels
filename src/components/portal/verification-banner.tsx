"use client";

import { useState } from "react";
import { CheckCircle2, MailWarning } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useCooldown } from "@/lib/use-cooldown";

export function VerificationBanner() {
  const { user, resendVerificationEmail } = useAuth();
  const cooldown = useCooldown(45);
  const [state, setState] = useState<"idle" | "sent" | "error">("idle");

  if (!user || user.emailVerified) return null;

  async function handleResend() {
    setState("idle");
    try {
      await resendVerificationEmail();
      setState("sent");
      cooldown.start();
    } catch {
      setState("error");
    }
  }

  return (
    <div className="flex flex-col items-start gap-2 bg-amber-50 px-6 py-3 text-sm text-amber-800 sm:flex-row sm:items-center sm:justify-between">
      <span className="flex items-center gap-2">
        <MailWarning className="h-4 w-4 shrink-0" />
        Please verify your email address ({user.email}). Check your inbox for the link.
      </span>
      <div className="flex items-center gap-3">
        {state === "sent" && (
          <span className="flex items-center gap-1 text-xs text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5" /> Sent
          </span>
        )}
        {state === "error" && (
          <span className="text-xs text-red-600">Unable to resend, try again shortly.</span>
        )}
        <button
          type="button"
          onClick={handleResend}
          disabled={cooldown.active}
          className="whitespace-nowrap text-xs font-semibold underline decoration-amber-400 underline-offset-2 disabled:no-underline disabled:opacity-60"
        >
          {cooldown.active ? `Resend in ${cooldown.remaining}s` : "Resend Verification Email"}
        </button>
      </div>
    </div>
  );
}
