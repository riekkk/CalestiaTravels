import { CalendarClock, MapPin } from "lucide-react";
import type { ApplicationAppointment } from "@/lib/types";

export function AppointmentCard({
  appointment,
}: {
  appointment: ApplicationAppointment | null;
}) {
  if (!appointment) {
    return (
      <div className="rounded-2xl border border-dashed border-primary/20 bg-white p-6 text-center">
        <CalendarClock className="mx-auto h-6 w-6 text-primary/40" strokeWidth={1.5} />
        <p className="mt-3 text-sm font-medium text-primary-dark">No Appointment Scheduled</p>
        <p className="mt-1 text-xs text-ink/50">
          We&apos;ll notify you here once a submission or pickup date is set.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-primary/10 bg-white p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <CalendarClock className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <div>
          <p className="text-xs uppercase tracking-wide text-ink/45">
            {appointment.type} Appointment
          </p>
          <p className="font-heading text-base font-semibold text-primary-dark">
            {appointment.date}
            {appointment.time ? ` · ${appointment.time}` : ""}
          </p>
        </div>
      </div>
      {appointment.location && (
        <p className="mt-4 flex items-center gap-2 text-sm text-ink/65">
          <MapPin className="h-4 w-4 shrink-0 text-primary/50" />
          {appointment.location}
        </p>
      )}
      {appointment.notes && (
        <p className="mt-3 rounded-xl bg-bg-light p-3 text-xs text-ink/60">{appointment.notes}</p>
      )}
    </div>
  );
}
