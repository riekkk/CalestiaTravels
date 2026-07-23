"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, FileStack, Mail, Phone, User } from "lucide-react";
import { useAllApplications, useAllBookings, useAllUsers } from "@/lib/admin-hooks";
import { updateBookingStatus } from "@/lib/firestore";
import { ApplicationStatusBadge } from "@/components/portal/status-badge";
import { StatusSelect } from "@/components/admin/status-select";
import { EmptyState } from "@/components/portal/empty-state";
import { formatDate } from "@/lib/utils";
import type { BookingStatus } from "@/lib/types";

const bookingStatusOptions: BookingStatus[] = ["Requested", "Confirmed", "Completed", "Cancelled"];

export default function AdminClientDetailPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params);
  const { applications } = useAllApplications(true);
  const { bookings } = useAllBookings(true);
  const { users } = useAllUsers(true);

  const profile = users.find((u) => u.uid === userId);
  const clientApplications = applications.filter((app) => app.userId === userId);
  const clientBookings = bookings.filter((b) => b.userId === userId);

  if (clientApplications.length === 0 && clientBookings.length === 0) {
    return (
      <div>
        <Link href="/admin/clients" className="flex items-center gap-2 text-sm text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Clients
        </Link>
        <p className="mt-6 text-sm text-ink/60">
          This client couldn&apos;t be found, or is still loading.
        </p>
      </div>
    );
  }

  const email = profile?.email || clientApplications[0]?.userEmail || clientBookings[0]?.userEmail;

  return (
    <div>
      <Link href="/admin/clients" className="flex items-center gap-2 text-sm text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to Clients
      </Link>

      <div className="mt-6 flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <User className="h-6 w-6" strokeWidth={1.75} />
        </span>
        <div>
          <h1 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
            {profile?.name || "Unnamed Client"}
          </h1>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink/55">
            {email && (
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" /> {email}
              </span>
            )}
            {profile?.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" /> {profile.phone}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold text-primary-dark">
          <FileStack className="h-4 w-4" /> Applications
        </h2>
        {clientApplications.length === 0 ? (
          <EmptyState icon={FileStack} title="No applications" description="This client hasn't submitted a visa application." />
        ) : (
          <div className="space-y-3">
            {clientApplications.map((app) => (
              <Link
                key={app.id}
                href={`/admin/applications/${app.id}`}
                className="flex flex-col gap-2 rounded-2xl border border-primary/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-primary-dark">{app.visaType}</p>
                  <p className="text-xs text-ink/50">Submitted {formatDate(app.submittedAt)}</p>
                </div>
                <ApplicationStatusBadge status={app.status} />
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold text-primary-dark">
          <CalendarDays className="h-4 w-4" /> Bookings
        </h2>
        {clientBookings.length === 0 ? (
          <EmptyState icon={CalendarDays} title="No bookings" description="This client hasn't requested a tour booking." />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-bg-light text-xs uppercase tracking-wide text-ink/50">
                <tr>
                  <th className="px-5 py-3 font-medium">Package</th>
                  <th className="px-5 py-3 font-medium">Travel Date</th>
                  <th className="px-5 py-3 font-medium">Pax</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                {clientBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-5 py-4 font-medium text-primary-dark">
                      {booking.packageName}
                    </td>
                    <td className="px-5 py-4 text-ink/65">{booking.travelDate}</td>
                    <td className="px-5 py-4 text-ink/65">{booking.pax}</td>
                    <td className="px-5 py-4">
                      <StatusSelect
                        value={booking.status}
                        options={bookingStatusOptions}
                        onChange={(next) => updateBookingStatus(booking.id, next)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
