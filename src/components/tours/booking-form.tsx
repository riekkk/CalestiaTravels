"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/form-fields";
import { isFirebaseConfigured } from "@/lib/firebase";
import { submitPackageBookingLead } from "@/lib/firestore";

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
          "Online booking isn't connected yet — please call or email us to reserve your slot."
        );
      }
      await submitPackageBookingLead({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        packageSlug,
        packageName,
        travelDate: String(data.get("travelDate") ?? ""),
        pax: Number(data.get("pax") ?? 1),
        message: String(data.get("message") ?? ""),
      });
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
        <Label htmlFor="booking-name">Full Name</Label>
        <Input id="booking-name" name="name" required placeholder="Juan Dela Cruz" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="booking-email">Email</Label>
          <Input id="booking-email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="booking-phone">Phone</Label>
          <Input id="booking-phone" name="phone" required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="booking-date">Preferred Date</Label>
          <Input id="booking-date" name="travelDate" type="date" required />
        </div>
        <div>
          <Label htmlFor="booking-pax">Number of Pax</Label>
          <Input id="booking-pax" name="pax" type="number" min={1} defaultValue={1} required />
        </div>
      </div>
      <div>
        <Label htmlFor="booking-message">Message (optional)</Label>
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
    </form>
  );
}
