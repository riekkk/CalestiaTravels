"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Save } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { updateClientProfile } from "@/lib/firestore";
import { Input, Label } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setSaved(false);
    setError("");
    const data = new FormData(e.currentTarget);
    try {
      await updateClientProfile(user.uid, {
        name: String(data.get("name") ?? ""),
        phone: String(data.get("phone") ?? ""),
        address: String(data.get("address") ?? ""),
      });
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update profile.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
        My Profile
      </h1>
      <p className="mt-1 text-sm text-ink/55">Manage your account information.</p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-3xl border border-primary/10 bg-white p-6 sm:p-8"
      >
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" value={user?.email ?? ""} disabled />
        </div>
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" defaultValue={user?.displayName ?? ""} />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" placeholder="09XX XXX XXXX" />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input id="address" name="address" placeholder="City, Province" />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {saved && (
          <p className="flex items-center gap-2 text-sm text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Profile updated.
          </p>
        )}
        <Button type="submit" disabled={loading || !user}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Changes
        </Button>
      </form>
    </div>
  );
}
