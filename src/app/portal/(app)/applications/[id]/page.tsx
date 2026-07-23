"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useApplications, useDocuments, useNotifications } from "@/lib/portal-hooks";
import { uploadClientDocument } from "@/lib/firestore";
import { getVisaTypeByTitle } from "@/lib/data/visa-types";
import { DOCUMENT_UPLOADS_ENABLED } from "@/lib/feature-flags";
import { ApplicationStatusBadge } from "@/components/portal/status-badge";
import { ApplicationTimeline } from "@/components/portal/application-timeline";
import { AppointmentCard } from "@/components/portal/appointment-card";
import { DocumentChecklist } from "@/components/portal/document-checklist";
import { ApplicationActivityFeed } from "@/components/portal/application-activity-feed";
import { FileUpload } from "@/components/portal/file-upload";
import { formatDate } from "@/lib/utils";

export default function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { user } = useAuth();
  const { applications } = useApplications(user?.uid);
  const { documents } = useDocuments(user?.uid);
  const { notifications } = useNotifications(user?.uid);

  const application = applications.find((app) => app.id === id);
  const appDocuments = documents.filter((doc) => doc.applicationId === id);
  const appActivity = notifications.filter((note) => note.applicationId === id);
  const visaType = application ? getVisaTypeByTitle(application.visaType) : undefined;

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

      <div className="mt-8">
        <ApplicationTimeline application={application} />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <div>
            <h2 className="mb-4 font-heading text-lg font-semibold text-primary-dark">
              Document Checklist
            </h2>
            {visaType ? (
              <DocumentChecklist
                requiredDocuments={visaType.requiredDocuments}
                checklist={application.documentChecklist}
              />
            ) : (
              <p className="text-sm text-ink/50">
                We couldn&apos;t match this application to a visa checklist.
              </p>
            )}
          </div>

          <div>
            <h2 className="mb-4 font-heading text-lg font-semibold text-primary-dark">
              Downloadable Documents
            </h2>
            {DOCUMENT_UPLOADS_ENABLED ? (
              <p className="text-sm text-ink/50">No shared documents yet.</p>
            ) : (
              <div className="flex items-center gap-3 rounded-2xl border border-dashed border-primary/20 bg-white p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary/50">
                  <Download className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-medium text-primary-dark/70">Coming Soon</p>
                  <p className="text-xs text-ink/50">
                    Once your visa or shared documents are ready, you&apos;ll be able to
                    download them here.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            <h2 className="mb-4 font-heading text-lg font-semibold text-primary-dark">
              Uploaded Documents
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
                await uploadClientDocument(user.uid, user.email ?? "", file, application.id);
              }}
            />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="mb-4 font-heading text-lg font-semibold text-primary-dark">
              Appointment
            </h2>
            <AppointmentCard appointment={application.appointment} />
          </div>

          <div>
            <h2 className="mb-4 font-heading text-lg font-semibold text-primary-dark">
              Activity
            </h2>
            <ApplicationActivityFeed notifications={appActivity} />
          </div>
        </div>
      </div>
    </div>
  );
}
