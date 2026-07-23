"use client";

import Link from "next/link";
import { Bell, CalendarDays, Download, FileStack, FileText, Home } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import {
  useApplications,
  useBookings,
  useDocuments,
  useNotifications,
} from "@/lib/portal-hooks";
import { StatCard } from "@/components/portal/stat-card";
import { ApplicationStatusBadge } from "@/components/portal/status-badge";
import { EmptyState } from "@/components/portal/empty-state";
import { ApplyVisaButton } from "@/components/portal/apply-visa/apply-visa-button";
import { ButtonLink } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const { user } = useAuth();
  const { applications } = useApplications(user?.uid);
  const { documents } = useDocuments(user?.uid);
  const { bookings } = useBookings(user?.uid);
  const { notifications } = useNotifications(user?.uid);

  const openApplications = applications.filter(
    (app) => app.status !== "Ready for Pickup" && app.status !== "Rejected"
  ).length;
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
            Welcome back{user?.displayName ? `, ${user.displayName}` : ""}
          </h1>
          <p className="mt-1 text-sm text-ink/55">
            Here&apos;s a snapshot of your applications and bookings.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/" variant="secondary" size="md">
            <Home className="h-4 w-4" />
            Go to Homepage
          </ButtonLink>
          <ButtonLink href="/portal/documents?tab=forms" variant="secondary" size="md">
            <Download className="h-4 w-4" />
            Download Forms
          </ButtonLink>
          <ApplyVisaButton>New Visa Application</ApplyVisaButton>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FileStack} label="Open Applications" value={openApplications} />
        <StatCard icon={FileText} label="Documents Uploaded" value={documents.length} />
        <StatCard icon={CalendarDays} label="Upcoming Bookings" value={bookings.length} />
        <StatCard icon={Bell} label="Unread Notifications" value={unreadNotifications} />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-primary-dark">
              Recent Applications
            </h2>
            <Link href="/portal/applications" className="text-sm font-medium text-primary">
              View all
            </Link>
          </div>
          {applications.length === 0 ? (
            <EmptyState
              icon={FileStack}
              title="No applications yet"
              description="Start a Japan visa application and track its status here."
              action={<ApplyVisaButton size="sm">Start Application</ApplyVisaButton>}
            />
          ) : (
            <div className="space-y-3">
              {applications.slice(0, 5).map((app) => (
                <Link
                  key={app.id}
                  href={`/portal/applications/${app.id}`}
                  className="flex items-center justify-between rounded-2xl border border-primary/10 bg-white p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-primary-dark">{app.visaType}</p>
                    <p className="text-xs text-ink/50">{formatDate(app.submittedAt)}</p>
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
              Recent Notifications
            </h2>
            <Link href="/portal/notifications" className="text-sm font-medium text-primary">
              View all
            </Link>
          </div>
          {notifications.length === 0 ? (
            <EmptyState
              icon={Bell}
              title="No notifications yet"
              description="Updates about your applications and bookings will show up here."
            />
          ) : (
            <div className="space-y-3">
              {notifications.slice(0, 5).map((note) => (
                <div
                  key={note.id}
                  className="rounded-2xl border border-primary/10 bg-white p-4"
                >
                  <p className="text-sm text-ink/75">{note.message}</p>
                  <p className="mt-1 text-xs text-ink/40">{formatDate(note.createdAt)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
