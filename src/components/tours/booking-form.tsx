"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/form-fields";
import { isFirebaseConfigured } from "@/lib/firebase";
import { submitPackageBookingLead } from "@/lib/firestore";
import { sendFormEmails } from "@/lib/email";
import { getRecaptchaToken, isRecaptchaConfigured } from "@/lib/recaptcha";

export function BookingForm({
  packageSlug,
  packageName,
}: {
  packageSlug: string;
  packageName: string;
}) {
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
          "Online booking isn't connected yet. Please call or email us to reserve your slot."
        );
      }
      if (!isRecaptchaConfigured) {
        throw new Error(
          "Spam protection isn't configured yet. Please call or email us to reserve your slot."
        );
      }
      const name = String(data.get("name") ?? "");
      const email = String(data.get("email") ?? "");
      const phone = String(data.get("phone") ?? "");
      const travelDate = String(data.get("travelDate") ?? "");
      const pax = Number(data.get("pax") ?? 1);
      const message = String(data.get("message") ?? "");

      const recaptchaToken = await getRecaptchaToken("booking_form");
      await submitPackageBookingLead(
        {
          name,
          email,
          phone,
          packageSlug,
          packageName,
          travelDate,
          pax,
          message,
        },
        recaptchaToken
      );

      sendFormEmails({
        formType: "Tour Booking Request",
        clientName: name,
        clientEmail: email,
        clientPhone: phone,
        details: `Package: ${packageName}\nPreferred Date: ${travelDate}\nPax: ${pax}${
          message ? `\nMessage: ${message}` : ""
        }`,
        nextSteps: "Our team will contact you shortly to confirm your slot and payment details.",
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
      <div className="rounded-2xl bg-white/10 p-6 text-center">
        <p className="font-heading text-lg font-semibold">Request received!</p>
        <p className="mt-2 text-sm text-white/70">
          Our team will contact you shortly to confirm your slot.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="booking-name" className="text-white">Full Name</Label>
        <Input id="booking-name" name="name" required placeholder="Juan Dela Cruz" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="booking-email" className="text-white">Email</Label>
          <Input id="booking-email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="booking-phone" className="text-white">Phone</Label>
          <Input id="booking-phone" name="phone" required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="booking-date" className="text-white">Preferred Date</Label>
          <Input id="booking-date" name="travelDate" type="date" required />
        </div>
        <div>
          <Label htmlFor="booking-pax" className="text-white">Number of Pax</Label>
          <Input id="booking-pax" name="pax" type="number" min={1} defaultValue={1} required />
        </div>
      </div>
      <div>
        <Label htmlFor="booking-message" className="text-white">Message (optional)</Label>
        <Textarea id="booking-message" name="message" rows={3} />
      </div>
      {status === "error" && <p className="text-sm text-red-200">{error}</p>}
      <Button type="submit" disabled={status === "loading"} className="w-full">
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        Reserve Your Slot
      </Button>
      <p className="text-xs text-white/40">
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
