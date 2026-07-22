"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Send } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createApplication } from "@/lib/firestore";
import { visaTypes } from "@/lib/data/visa-types";
import { Button } from "@/components/ui/button";
import { Label, Select, Textarea } from "@/components/ui/form-fields";

export default function NewApplicationPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError("");
    const data = new FormData(e.currentTarget);
    try {
      await createApplication(
        user.uid,
        String(data.get("visaType")),
        String(data.get("notes") ?? "")
      );
      router.push("/portal/applications");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit application.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
        New Visa Application
      </h1>
      <p className="mt-1 text-sm text-ink/55">
        Select the visa category that matches your purpose of travel. You&apos;ll
        be able to upload your documents once the application is created.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-3xl border border-primary/10 bg-white p-6 sm:p-8">
        <div>
          <Label htmlFor="visaType">Visa Type</Label>
          <Select id="visaType" name="visaType" required defaultValue="">
            <option value="" disabled>
              Select a visa category
            </option>
            {visaTypes.map((visa) => (
              <option key={visa.slug} value={visa.title}>
                {visa.shortTitle}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="notes">Notes for Your Coordinator (optional)</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder="Intended travel dates, purpose of visit, or anything else we should know."
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={loading || !user} className="w-full">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Submit Application
        </Button>
      </form>
    </div>
  );
}
