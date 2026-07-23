"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/form-fields";
import { isFirebaseConfigured } from "@/lib/firebase";
import { submitInquiry } from "@/lib/firestore";
import { sendFormEmails } from "@/lib/email";
import { getRecaptchaToken, isRecaptchaConfigured } from "@/lib/recaptcha";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      if (!isFirebaseConfigured) {
        throw new Error(
          "Online form submission isn't connected yet — please reach us by phone or email in the meantime."
        );
      }
      if (!isRecaptchaConfigured) {
        throw new Error(
          "Spam protection isn't configured yet — please reach us by phone or email in the meantime."
        );
      }
      const name = String(data.get("name") ?? "");
      const email = String(data.get("email") ?? "");
      const phone = String(data.get("phone") ?? "");
      const message = String(data.get("message") ?? "");

      const recaptchaToken = await getRecaptchaToken("contact_form");
      await submitInquiry({ name, email, phone, message }, recaptchaToken);

      sendFormEmails({
        formType: "Contact Inquiry",
        clientName: name,
        clientEmail: email,
        clientPhone: phone,
        details: message,
        nextSteps: "Our team will review your message and get back to you shortly.",
      }).catch((err) => console.error("EmailJS send failed:", err));

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-primary/10 bg-bg-light p-8 text-center">
        <p className="font-heading text-lg font-semibold text-primary-dark">
          Message sent!
        </p>
        <p className="mt-2 text-sm text-ink/65">
          Thank you for reaching out. Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" required placeholder="Juan Dela Cruz" />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" required placeholder="09XX XXX XXXX" />
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" name="email" type="email" required placeholder="you@email.com" />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your trip or visa application..."
        />
      </div>
      {status === "error" && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        Send Message
      </Button>
      <p className="text-xs text-ink/40">
        This site is protected by reCAPTCHA and the Google{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Terms of Service
        </a>{" "}
        apply.
      </p>
    </form>
  );
}
