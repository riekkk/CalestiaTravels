"use client";

import Link from "next/link";
import { CalendarDays, FileStack, FileText, Home, Inbox } from "lucide-react";
import { useAllApplications, useAllBookings, useAllDocuments } from "@/lib/admin-hooks";
import { StatCard } from "@/components/portal/stat-card";
import { ApplicationStatusBadge, BookingStatusBadge } from "@/components/portal/status-badge";
import { EmptyState } from "@/components/portal/empty-state";
import { ButtonLink } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const { applications } = useAllApplications(true);
  const { documents } = useAllDocuments(true);
  const { bookings } = useAllBookings(true);

  const openApplications = applications.filter(
    (app) => app.status !== "Ready for Pickup" && app.status !== "Rejected"
  ).length;
  const pendingBookings = bookings.filter((b) => b.status === "Requested").length;

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
            Staff Dashboard
          </h1>
          <p className="mt-1 text-sm text-ink/55">
            Overview of every client application, document, and booking.
          </p>
        </div>
        <ButtonLink href="/" variant="secondary" size="md">
          <Home className="h-4 w-4" />
          Go to Homepage
        </ButtonLink>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FileStack} label="Open Applications" value={openApplications} />
        <StatCard icon={Inbox} label="Pending Bookings" value={pendingBookings} />
        <StatCard icon={FileText} label="Total Documents" value={documents.length} />
        <StatCard icon={CalendarDays} label="Total Bookings" value={bookings.length} />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-primary-dark">
              Recent Applications
            </h2>
            <Link href="/admin/applications" className="text-sm font-medium text-primary">
              View all
            </Link>
          </div>
          {applications.length === 0 ? (
            <EmptyState
              icon={FileStack}
              title="No applications yet"
              description="Client visa applications will appear here as they're submitted."
            />
          ) : (
            <div className="space-y-3">
              {applications.slice(0, 6).map((app) => (
                <Link
                  key={app.id}
                  href={`/admin/applications/${app.id}`}
                  className="flex items-center justify-between rounded-2xl border border-primary/10 bg-white p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-primary-dark">{app.visaType}</p>
                    <p className="text-xs text-ink/50">
                      {app.userEmail ?? app.userId} · {formatDate(app.submittedAt)}
                    </p>
                  </div>
                  <ApplicationStatusBadge status={app.status} />
                </Link>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-primary-dark">
              Recent Bookings
            </h2>
            <Link href="/admin/bookings" className="text-sm font-medium text-primary">
              View all
            </Link>
          </div>
          {bookings.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title="No bookings yet"
              description="Tour package booking requests will appear here."
            />
          ) : (
            <div className="space-y-3">
              {bookings.slice(0, 6).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between rounded-2xl border border-primary/10 bg-white p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-primary-dark">
                      {booking.packageName}
                    </p>
                    <p className="text-xs text-ink/50">
                      {booking.userEmail ?? booking.userId} · {booking.travelDate}
                    </p>
                  </div>
                  <BookingStatusBadge status={booking.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
