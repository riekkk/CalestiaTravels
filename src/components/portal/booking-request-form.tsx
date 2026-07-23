"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Plus } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createBookingRequest } from "@/lib/firestore";
import { useActiveTourPackages } from "@/lib/tour-hooks";
import { tourHasFullContent } from "@/lib/tour-utils";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/form-fields";
import { sendFormEmails } from "@/lib/email";

export function BookingRequestForm({ onDone }: { onDone?: () => void }) {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { tours: allTours } = useActiveTourPackages();
  const tours = allTours.filter(tourHasFullContent);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError("");
    const data = new FormData(e.currentTarget);
    const slug = String(data.get("packageSlug"));
    const tour = tours.find((t) => t.slug === slug);
    if (!tour) {
      setError("Please select a package.");
      setLoading(false);
      return;
    }
    const travelDate = String(data.get("travelDate"));
    const pax = Number(data.get("pax"));

    try {
      await createBookingRequest(
        user.uid,
        user.email ?? "",
        tour.slug,
        tour.title,
        travelDate,
        pax
      );

      sendFormEmails({
        formType: "Tour Booking Request",
        clientName: profile?.name || user.displayName || "Client Portal user",
        clientEmail: user.email ?? "",
        clientPhone: profile?.phone ?? "",
        details: `Package: ${tour.title}\nPreferred Date: ${travelDate}\nPax: ${pax}`,
        nextSteps: "Our team will contact you shortly to confirm your slot and payment details.",
      }).catch((err) => console.error("EmailJS send failed:", err));

      e.currentTarget.reset();
      onDone?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit request.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-primary/10 bg-white p-6">
      <div>
        <Label htmlFor="packageSlug">Tour Package</Label>
        <Select id="packageSlug" name="packageSlug" required defaultValue="">
          <option value="" disabled>
            Select a package
          </option>
          {tours.map((tour) => (
            <option key={tour.slug} value={tour.slug}>
              {tour.title}
            </option>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="travelDate">Preferred Date</Label>
          <Input id="travelDate" name="travelDate" type="date" required />
        </div>
        <div>
          <Label htmlFor="pax">Pax</Label>
          <Input id="pax" name="pax" type="number" min={1} defaultValue={1} required />
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={loading || !user} className="w-full sm:w-auto">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
        Request Booking
      </Button>
    </form>
  );
}
