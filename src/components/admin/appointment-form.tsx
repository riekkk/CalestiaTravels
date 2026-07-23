"use client";

import { useState, type FormEvent } from "react";
import { CalendarClock, Loader2 } from "lucide-react";
import type { ApplicationAppointment } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/form-fields";

export function AppointmentForm({
  appointment,
  onSave,
}: {
  appointment: ApplicationAppointment | null;
  onSave: (appointment: ApplicationAppointment) => Promise<void>;
}) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    const data = new FormData(e.currentTarget);
    try {
      await onSave({
        type: data.get("type") as ApplicationAppointment["type"],
        date: String(data.get("date") ?? ""),
        time: String(data.get("time") ?? "") || undefined,
        location: String(data.get("location") ?? "") || undefined,
        notes: String(data.get("notes") ?? "") || undefined,
      });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-primary/10 bg-white p-6">
      <div className="flex items-center gap-2 text-primary-dark">
        <CalendarClock className="h-4 w-4" />
        <p className="font-heading text-sm font-semibold">Appointment</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="appt-type">Type</Label>
          <Select id="appt-type" name="type" defaultValue={appointment?.type ?? "Submission"}>
            <option value="Submission">Submission</option>
            <option value="Pickup">Pickup</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="appt-date">Date</Label>
          <Input id="appt-date" name="date" type="date" defaultValue={appointment?.date} required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="appt-time">Time (optional)</Label>
          <Input id="appt-time" name="time" type="time" defaultValue={appointment?.time} />
        </div>
        <div>
          <Label htmlFor="appt-location">Location (optional)</Label>
          <Input
            id="appt-location"
            name="location"
            defaultValue={appointment?.location}
            placeholder="Calestia Office, General Trias"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="appt-notes">Notes (optional)</Label>
        <Textarea
          id="appt-notes"
          name="notes"
          rows={2}
          defaultValue={appointment?.notes}
          placeholder="Anything the client should bring or know."
        />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" size="sm" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {appointment ? "Update Appointment" : "Schedule Appointment"}
        </Button>
        {saved && <span className="text-xs text-emerald-600">Saved, client notified</span>}
      </div>
    </form>
  );
}
