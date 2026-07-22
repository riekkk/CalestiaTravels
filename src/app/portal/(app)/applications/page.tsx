"use client";

import Link from "next/link";
import { FileStack } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useApplications } from "@/lib/portal-hooks";
import { ApplicationStatusBadge } from "@/components/portal/status-badge";
import { EmptyState } from "@/components/portal/empty-state";
import { ButtonLink } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export default function ApplicationsPage() {
  const { user } = useAuth();
  const { applications, loading } = useApplications(user?.uid);

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
            My Applications
          </h1>
          <p className="mt-1 text-sm text-ink/55">
            Track the status of every visa application you&apos;ve submitted.
          </p>
        </div>
        <ButtonLink href="/portal/applications/new">New Application</ButtonLink>
      </div>

      {!loading && applications.length === 0 ? (
        <EmptyState
          icon={FileStack}
          title="No applications yet"
          description="Start a Japan visa application and we'll walk you through the required documents."
          action={<ButtonLink href="/portal/applications/new" size="sm">Start Application</ButtonLink>}
        />
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <Link
              key={app.id}
              href={`/portal/applications/${app.id}`}
              className="flex flex-col gap-2 rounded-2xl border border-primary/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-primary-dark">{app.visaType}</p>
                <p className="text-xs text-ink/50">
                  Submitted {formatDate(app.submittedAt)}
                </p>
              </div>
              <ApplicationStatusBadge status={app.status} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
