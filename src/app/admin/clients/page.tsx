"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import { useAllApplications, useAllBookings, useAllUsers } from "@/lib/admin-hooks";
import { ApplicationStatusBadge, BookingStatusBadge } from "@/components/portal/status-badge";
import { EmptyState } from "@/components/portal/empty-state";
import type { Booking, VisaApplication } from "@/lib/types";

type ClientSummary = {
  userId: string;
  name: string;
  email: string;
  applications: VisaApplication[];
  bookings: Booking[];
};

export default function AdminClientsPage() {
  const { applications, loading: loadingApplications } = useAllApplications(true);
  const { bookings, loading: loadingBookings } = useAllBookings(true);
  const { users } = useAllUsers(true);

  const loading = loadingApplications || loadingBookings;
  const usersByUid = new Map(users.map((u) => [u.uid, u]));

  // Only clients with at least one application OR booking end up here —
  // built entirely from those two collections, never from the full user list.
  const clientsByUid = new Map<string, ClientSummary>();

  function getOrCreate(userId: string, fallbackEmail?: string): ClientSummary {
    const existing = clientsByUid.get(userId);
    if (existing) return existing;
    const profile = usersByUid.get(userId);
    const created: ClientSummary = {
      userId,
      name: profile?.name || "Unnamed Client",
      email: profile?.email || fallbackEmail || "Unknown email",
      applications: [],
      bookings: [],
    };
    clientsByUid.set(userId, created);
    return created;
  }

  for (const application of applications) {
    getOrCreate(application.userId, application.userEmail).applications.push(application);
  }
  for (const booking of bookings) {
    getOrCreate(booking.userId, booking.userEmail).bookings.push(booking);
  }

  const clients = Array.from(clientsByUid.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
        Clients
      </h1>
      <p className="mt-1 text-sm text-ink/55">
        Everyone who has submitted a visa application or tour booking.
      </p>

      <div className="mt-8">
        {!loading && clients.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No clients yet"
            description="Clients will appear here once someone submits a visa application or tour booking."
          />
        ) : (
          <div className="space-y-3">
            {clients.map((client) => (
              <Link
                key={client.userId}
                href={`/admin/clients/${client.userId}`}
                className="flex flex-col gap-3 rounded-2xl border border-primary/10 bg-white p-5"
              >
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-medium text-primary-dark">{client.name}</p>
                    <p className="text-xs text-ink/50">{client.email}</p>
                  </div>
                  <p className="text-xs text-ink/40">
                    {client.applications.length} application
                    {client.applications.length === 1 ? "" : "s"} ·{" "}
                    {client.bookings.length} booking{client.bookings.length === 1 ? "" : "s"}
                  </p>
                </div>

                {(client.applications.length > 0 || client.bookings.length > 0) && (
                  <div className="flex flex-wrap gap-2 border-t border-primary/10 pt-3">
                    {client.applications.map((app) => (
                      <span
                        key={app.id}
                        className="inline-flex items-center gap-1.5 rounded-full bg-bg-light px-2.5 py-1 text-xs text-ink/70"
                      >
                        {app.visaType}
                        <ApplicationStatusBadge status={app.status} />
                      </span>
                    ))}
                    {client.bookings.map((booking) => (
                      <span
                        key={booking.id}
                        className="inline-flex items-center gap-1.5 rounded-full bg-bg-light px-2.5 py-1 text-xs text-ink/70"
                      >
                        {booking.packageName}
                        <BookingStatusBadge status={booking.status} />
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
