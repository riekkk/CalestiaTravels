"use client";

import { use, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, FileText, Loader2, Send } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useAllApplications, useAllDocuments } from "@/lib/admin-hooks";
import { useNotifications } from "@/lib/portal-hooks";
import {
  sendNotificationToUser,
  setApplicationAppointment,
  setDocumentChecklistItem,
  updateApplicationNotes,
  updateApplicationStatus,
} from "@/lib/firestore";
import { getSignedFileUrl } from "@/lib/upload";
import { getVisaTypeByTitle } from "@/lib/data/visa-types";
import { StatusSelect } from "@/components/admin/status-select";
import { AppointmentForm } from "@/components/admin/appointment-form";
import { ApplicationTimeline } from "@/components/portal/application-timeline";
import { DocumentChecklist } from "@/components/portal/document-checklist";
import { ApplicationActivityFeed } from "@/components/portal/application-activity-feed";
import { Button } from "@/components/ui/button";
import { Label, Textarea } from "@/components/ui/form-fields";
import { formatDate } from "@/lib/utils";
import type { ApplicationStatus } from "@/lib/types";

const statusOptions: ApplicationStatus[] = [
  "Submitted",
  "In Review",
  "Needs Documents",
  "Approved",
  "Ready for Pickup",
  "Rejected",
];

export default function AdminApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { user } = useAuth();
  const { applications } = useAllApplications(true);
  const { documents } = useAllDocuments(true);
  const application = applications.find((app) => app.id === id);
  const { notifications } = useNotifications(application?.userId);

  const appDocuments = documents.filter((doc) => doc.applicationId === id);
  const appActivity = notifications.filter((note) => note.applicationId === id);
  const visaType = application ? getVisaTypeByTitle(application.visaType) : undefined;
  const [viewingDocId, setViewingDocId] = useState<string | null>(null);

  async function handleViewDocument(docId: string) {
    if (!user) return;
    setViewingDocId(docId);
    try {
      const url = await getSignedFileUrl(user, "document", docId);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Unable to open file.");
    } finally {
      setViewingDocId(null);
    }
  }

  const [notes, setNotes] = useState(application?.notes ?? "");
  const [notesSaved, setNotesSaved] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);

  const [notifyStatus, setNotifyStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle"
  );

  if (!application) {
    return (
      <div>
        <Link href="/admin/applications" className="flex items-center gap-2 text-sm text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Applications
        </Link>
        <p className="mt-6 text-sm text-ink/60">
          This application couldn&apos;t be found, or is still loading.
        </p>
      </div>
    );
  }

  async function handleSaveNotes() {
    setSavingNotes(true);
    setNotesSaved(false);
    try {
      await updateApplicationNotes(application!.id, notes);
      setNotesSaved(true);
    } finally {
      setSavingNotes(false);
    }
  }

  async function handleSendNotification(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotifyStatus("loading");
    const data = new FormData(e.currentTarget);
    try {
      await sendNotificationToUser(
        application!.userId,
        String(data.get("message") ?? ""),
        application!.id
      );
      setNotifyStatus("sent");
      e.currentTarget.reset();
    } catch {
      setNotifyStatus("error");
    }
  }

  return (
    <div>
      <Link href="/admin/applications" className="flex items-center gap-2 text-sm text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to Applications
      </Link>

      <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
            {application.visaType}
          </h1>
          <p className="mt-1 text-sm text-ink/55">
            {application.userEmail ?? application.userId} · Submitted{" "}
            {formatDate(application.submittedAt)}
          </p>
        </div>
        <StatusSelect
          value={application.status}
          options={statusOptions}
          onChange={(next) =>
            updateApplicationStatus(application.id, application.userId, application.visaType, next)
          }
        />
      </div>

      <div className="mt-8">
        <ApplicationTimeline application={application} />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="space-y-10">
          <div>
            <h2 className="mb-4 font-heading text-lg font-semibold text-primary-dark">
              Internal Notes
            </h2>
            <Textarea
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                setNotesSaved(false);
              }}
              rows={5}
              placeholder="Notes about this application, visible to your team only."
            />
            <div className="mt-3 flex items-center gap-3">
              <Button size="sm" onClick={handleSaveNotes} disabled={savingNotes}>
                {savingNotes ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Notes"}
              </Button>
              {notesSaved && <span className="text-xs text-emerald-600">Saved</span>}
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-heading text-lg font-semibold text-primary-dark">
              Document Checklist
            </h2>
            {visaType ? (
              <DocumentChecklist
                requiredDocuments={visaType.requiredDocuments}
                checklist={application.documentChecklist}
                onToggle={(name, received) =>
                  setDocumentChecklistItem(application.id, name, received)
                }
              />
            ) : (
              <p className="text-sm text-ink/50">
                Couldn&apos;t match this application to a visa checklist.
              </p>
            )}
          </div>

          <div>
            <h2 className="mb-4 font-heading text-lg font-semibold text-primary-dark">
              Uploaded Documents
            </h2>
            {appDocuments.length === 0 ? (
              <p className="text-sm text-ink/50">No documents uploaded for this application yet.</p>
            ) : (
              <div className="space-y-2">
                {appDocuments.map((doc) => (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => handleViewDocument(doc.id)}
                    disabled={viewingDocId === doc.id}
                    className="flex w-full items-center gap-3 rounded-xl border border-primary/10 bg-white p-4 text-left disabled:opacity-50"
                  >
                    {viewingDocId === doc.id ? (
                      <Loader2 className="h-4 w-4 shrink-0 animate-spin text-primary" />
                    ) : (
                      <FileText className="h-4 w-4 shrink-0 text-primary" />
                    )}
                    <span className="flex-1 truncate text-sm text-ink/75">{doc.fileName}</span>
                    <span className="text-xs text-ink/40">{formatDate(doc.uploadedAt)}</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-ink/30" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-10">
          <div>
            <h2 className="mb-4 font-heading text-lg font-semibold text-primary-dark">
              Appointment
            </h2>
            <AppointmentForm
              appointment={application.appointment}
              onSave={(appointment) =>
                setApplicationAppointment(
                  application.id,
                  application.userId,
                  application.visaType,
                  appointment
                )
              }
            />
          </div>

          <div>
            <h2 className="mb-4 font-heading text-lg font-semibold text-primary-dark">
              Send Notification to Client
            </h2>
            <form
              onSubmit={handleSendNotification}
              className="space-y-4 rounded-2xl border border-primary/10 bg-white p-6"
            >
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="e.g. Your passport is ready for pickup at our office."
                />
              </div>
              {notifyStatus === "error" && (
                <p className="text-sm text-red-600">Unable to send. Try again.</p>
              )}
              {notifyStatus === "sent" && (
                <p className="text-sm text-emerald-600">Notification sent.</p>
              )}
              <Button type="submit" disabled={notifyStatus === "loading"} className="w-full sm:w-auto">
                {notifyStatus === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Send Notification
              </Button>
            </form>
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
