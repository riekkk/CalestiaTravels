"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileText } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useApplications, useDocuments } from "@/lib/portal-hooks";
import { uploadClientDocument } from "@/lib/firestore";
import { ApplicationStatusBadge } from "@/components/portal/status-badge";
import { FileUpload } from "@/components/portal/file-upload";
import { formatDate } from "@/lib/utils";

const timelineSteps = ["Submitted", "In Review", "Approved"] as const;

export default function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { user } = useAuth();
  const { applications } = useApplications(user?.uid);
  const { documents } = useDocuments(user?.uid);

  const application = applications.find((app) => app.id === id);
  const appDocuments = documents.filter((doc) => doc.applicationId === id);

  if (!application) {
    return (
      <div>
        <Link href="/portal/applications" className="flex items-center gap-2 text-sm text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Applications
        </Link>
        <p className="mt-6 text-sm text-ink/60">
          This application couldn&apos;t be found, or is still loading.
        </p>
      </div>
    );
  }

  const currentStepIndex =
    application.status === "Rejected" || application.status === "Needs Documents"
      ? 1
      : timelineSteps.indexOf(application.status as (typeof timelineSteps)[number]);

  return (
    <div>
      <Link href="/portal/applications" className="flex items-center gap-2 text-sm text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to Applications
      </Link>

      <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
            {application.visaType}
          </h1>
          <p className="mt-1 text-sm text-ink/55">
            Submitted {formatDate(application.submittedAt)}
          </p>
        </div>
        <ApplicationStatusBadge status={application.status} />
      </div>

      <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6">
        <div className="flex items-center justify-between">
          {timelineSteps.map((step, index) => (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <span
                  className={
                    index <= currentStepIndex
                      ? "flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white"
                      : "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary/40"
                  }
                >
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <span className="text-xs font-medium text-ink/60">{step}</span>
              </div>
              {index < timelineSteps.length - 1 && (
                <div
                  className={
                    index < currentStepIndex
                      ? "mx-2 h-0.5 flex-1 bg-primary"
                      : "mx-2 h-0.5 flex-1 bg-primary/10"
                  }
                />
              )}
            </div>
          ))}
        </div>
        {application.notes && (
          <p className="mt-6 rounded-xl bg-bg-light p-4 text-sm text-ink/70">
            <span className="font-medium text-primary-dark">Notes: </span>
            {application.notes}
          </p>
        )}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 font-heading text-lg font-semibold text-primary-dark">
          Documents
        </h2>
        {appDocuments.length > 0 && (
          <div className="mb-4 space-y-2">
            {appDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 rounded-xl border border-primary/10 bg-white p-4"
              >
                <FileText className="h-4 w-4 text-primary" />
                <span className="flex-1 truncate text-sm text-ink/75">{doc.fileName}</span>
                <span className="text-xs text-ink/40">{formatDate(doc.uploadedAt)}</span>
              </div>
            ))}
          </div>
        )}
        <FileUpload
          onUpload={async (file) => {
            if (!user) return;
            await uploadClientDocument(user.uid, file, application.id);
          }}
        />
      </div>
    </div>
  );
}
