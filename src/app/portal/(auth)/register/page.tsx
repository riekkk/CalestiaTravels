"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, MailCheck, UserPlus } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useCooldown } from "@/lib/use-cooldown";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/form-fields";

export default function RegisterPage() {
  const { register, resendVerificationEmail, isFirebaseConfigured } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const resendCooldown = useCooldown(45);
  const [resendState, setResendState] = useState<"idle" | "sent" | "error">("idle");

  const canSubmit = isFirebaseConfigured && agreedToTerms && agreedToPrivacy;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError("");
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email"));
    try {
      await register(String(data.get("name")), email, String(data.get("password")), {
        agreedToTerms,
        agreedToPrivacy,
      });
      setRegisteredEmail(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setResendState("idle");
    try {
      await resendVerificationEmail();
      setResendState("sent");
      resendCooldown.start();
    } catch {
      setResendState("error");
    }
  }

  if (registeredEmail) {
    return (
      <div className="text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MailCheck className="h-7 w-7" strokeWidth={1.75} />
        </span>
        <h1 className="mt-5 font-heading text-2xl font-semibold text-primary-dark">
          Verify Your Email
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/60">
          We&apos;ve sent a verification link to{" "}
          <span className="font-medium text-primary-dark">{registeredEmail}</span>. Check
          your inbox (and spam folder) and click the link to verify your account before
          continuing.
        </p>

        {resendState === "sent" && (
          <p className="mt-4 flex items-center justify-center gap-2 text-sm text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Verification email resent.
          </p>
        )}
        {resendState === "error" && (
          <p className="mt-4 text-sm text-red-600">
            Unable to resend right now. Please try again shortly.
          </p>
        )}

        <Button
          type="button"
          variant="secondary"
          className="mt-6 w-full"
          onClick={handleResend}
          disabled={resendCooldown.active}
        >
          {resendCooldown.active
            ? `Resend available in ${resendCooldown.remaining}s`
            : "Resend Verification Email"}
        </Button>

        <ButtonLink href="/portal/dashboard" className="mt-3 w-full">
          Continue to Dashboard
        </ButtonLink>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-primary-dark">
        Create Your Account
      </h1>
      <p className="mt-2 text-sm text-ink/60">
        Track your visa applications and bookings in one place.
      </p>

      {!isFirebaseConfigured && (
        <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-800">
          Firebase isn&apos;t connected yet, so account creation is disabled for now.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required minLength={6} />
        </div>

        <div className="space-y-2.5 rounded-xl bg-bg-light p-4">
          <label className="flex items-start gap-2.5 text-sm text-ink/70">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-primary/30 text-primary focus:ring-primary/30"
            />
            <span>
              I agree to the{" "}
              <Link
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline"
              >
                Terms of Service
              </Link>
            </span>
          </label>
          <label className="flex items-start gap-2.5 text-sm text-ink/70">
            <input
              type="checkbox"
              checked={agreedToPrivacy}
              onChange={(e) => setAgreedToPrivacy(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-primary/30 text-primary focus:ring-primary/30"
            />
            <span>
              I agree to the{" "}
              <Link
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline"
              >
                Privacy Policy
              </Link>
            </span>
          </label>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button
          type="submit"
          disabled={loading || !canSubmit}
          className="w-full"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink/60">
        Already have an account?{" "}
        <Link href="/portal/login" className="font-medium text-primary">
          Sign in
        </Link>
      </p>
    </div>
  );
}
