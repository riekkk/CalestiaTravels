"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { KeyRound, Loader2, MailCheck } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/form-fields";

export default function ForgotPasswordPage() {
  const { resetPassword, isFirebaseConfigured } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [configError, setConfigError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setConfigError("");
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email"));
    try {
      await resetPassword(email);
    } catch {
      // Don't reveal whether the account exists — only surface a genuine
      // configuration problem (e.g. Firebase not connected), not
      // "user not found" or similar, which would leak account existence.
      if (!isFirebaseConfigured) {
        setConfigError("Password reset isn't connected yet. Please contact us directly.");
        setLoading(false);
        return;
      }
    }
    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MailCheck className="h-7 w-7" strokeWidth={1.75} />
        </span>
        <h1 className="mt-5 font-heading text-2xl font-semibold text-primary-dark">
          Check Your Email
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/60">
          If an account exists for that email address, we&apos;ve sent a link to
          reset your password. Check your inbox (and spam folder).
        </p>
        <Link
          href="/portal/login"
          className="mt-6 inline-block text-sm font-medium text-primary"
        >
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div>
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <KeyRound className="h-6 w-6" strokeWidth={1.75} />
      </span>
      <h1 className="mt-4 font-heading text-2xl font-semibold text-primary-dark">
        Reset Your Password
      </h1>
      <p className="mt-2 text-sm text-ink/60">
        Enter the email address on your account and we&apos;ll send you a link
        to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        {configError && <p className="text-sm text-red-600">{configError}</p>}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MailCheck className="h-4 w-4" />}
          Send Reset Link
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink/60">
        Remembered your password?{" "}
        <Link href="/portal/login" className="font-medium text-primary">
          Sign in
        </Link>
      </p>
    </div>
  );
}
