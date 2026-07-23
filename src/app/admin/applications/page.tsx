"use client";

import { useState } from "react";
import Link from "next/link";
import { FileStack } from "lucide-react";
import { useAllApplications } from "@/lib/admin-hooks";
import { ApplicationStatusBadge } from "@/components/portal/status-badge";
import { EmptyState } from "@/components/portal/empty-state";
import { Select } from "@/components/ui/form-fields";
import { formatDate } from "@/lib/utils";
import type { ApplicationStatus } from "@/lib/types";

const statusFilters: (ApplicationStatus | "All")[] = [
  "All",
  "Submitted",
  "In Review",
  "Needs Documents",
  "Approved",
  "Ready for Pickup",
  "Rejected",
];

export default function AdminApplicationsPage() {
  const { applications, loading } = useAllApplications(true);
  const [filter, setFilter] = useState<(typeof statusFilters)[number]>("All");

  const filtered =
    filter === "All" ? applications : applications.filter((a) => a.status === filter);

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
            All Applications
          </h1>
          <p className="mt-1 text-sm text-ink/55">
            Every client visa application across the system.
          </p>
        </div>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value as (typeof statusFilters)[number])}
          className="w-48"
        >
          {statusFilters.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Select>
      </div>

      {!loading && filtered.length === 0 ? (
        <EmptyState
          icon={FileStack}
          title="No applications found"
          description="No applications match this filter yet."
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => (
            <Link
              key={app.id}
              href={`/admin/applications/${app.id}`}
              className="flex flex-col gap-2 rounded-2xl border border-primary/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-primary-dark">{app.visaType}</p>
                <p className="text-xs text-ink/50">
                  {app.userEmail ?? app.userId} · Submitted {formatDate(app.submittedAt)}
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
