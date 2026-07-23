"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ExternalLink, FileText, Loader2, Trash2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useDocuments, useFormsChecklist } from "@/lib/portal-hooks";
import { createDocumentRecord, setFormsChecklistItem } from "@/lib/firestore";
import { uploadFile, getSignedFileUrl, deleteUploadedDocument } from "@/lib/upload";
import { FileUpload } from "@/components/portal/file-upload";
import { EmptyState } from "@/components/portal/empty-state";
import { Tabs } from "@/components/ui/tabs";
import { DownloadableFormsGrid } from "@/components/portal/downloadable-forms-grid";
import { VisaRequirementsChecklist } from "@/components/portal/visa-requirements-checklist";
import { formatDate } from "@/lib/utils";

type DocumentsTab = "documents" | "forms";

const TABS = [
  { id: "documents", label: "My Documents" },
  { id: "forms", label: "Forms & Checklist" },
];

function DocumentsPageContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<DocumentsTab>(
    searchParams.get("tab") === "forms" ? "forms" : "documents"
  );

  const { user } = useAuth();
  const { documents, loading } = useDocuments(user?.uid);
  const { checklist } = useFormsChecklist(user?.uid);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function handleView(id: string) {
    if (!user) return;
    setBusyId(id);
    try {
      const url = await getSignedFileUrl(user, "document", id);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Unable to open file.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!user) return;
    if (!confirm("Delete this document? This cannot be undone.")) return;
    setBusyId(id);
    try {
      await deleteUploadedDocument(user, id);
    } finally {
      setBusyId(null);
    }
  }

  async function handleToggleChecklistItem(itemId: string, checked: boolean) {
    if (!user) return;
    await setFormsChecklistItem(user.uid, itemId, checked);
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
        My Documents
      </h1>

      <div className="mt-5">
        <Tabs tabs={TABS} active={activeTab} onChange={(id) => setActiveTab(id as DocumentsTab)} />
      </div>

      <p className="mt-4 text-sm text-ink/55">
        {activeTab === "documents"
          ? "Upload and manage the documents you've submitted across all applications."
          : "Download the forms you need and track your visa document checklist."}
      </p>

      {activeTab === "documents" ? (
        <>
          <div className="mt-6 max-w-xl">
            <FileUpload
              onUpload={async (file) => {
                if (!user) return;
                const { path } = await uploadFile(user, file, "document");
                await createDocumentRecord(user.uid, user.email ?? "", file.name, path, null);
              }}
            />
          </div>

          <div className="mt-8">
            {!loading && documents.length === 0 ? (
              <EmptyState
                icon={FileText}
                title="No documents uploaded"
                description="Documents you upload here or from an application will appear in this list."
              />
            ) : (
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center gap-3 rounded-xl border border-primary/10 bg-white p-4"
                  >
                    <FileText className="h-4 w-4 shrink-0 text-primary" />
                    <span className="flex-1 truncate text-sm text-ink/75">{doc.fileName}</span>
                    <span className="text-xs text-ink/40">{formatDate(doc.uploadedAt)}</span>
                    <button
                      type="button"
                      onClick={() => handleView(doc.id)}
                      disabled={busyId === doc.id}
                      aria-label="View document"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-primary/60 hover:bg-bg-light hover:text-primary disabled:opacity-50"
                    >
                      {busyId === doc.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ExternalLink className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(doc.id)}
                      disabled={busyId === doc.id}
                      aria-label="Delete document"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-red-500/70 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="mt-8 space-y-10">
          <div>
            <h2 className="font-heading text-lg font-semibold text-primary-dark">
              Downloadable Forms
            </h2>
            <p className="mt-1 text-sm text-ink/55">
              Fill in and print. Bring the signed printout to your appointment.
            </p>
            <div className="mt-4">
              <DownloadableFormsGrid />
            </div>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold text-primary-dark">
              Visa Requirements Checklist
            </h2>
            <p className="mt-1 text-sm text-ink/55">
              Standard document requirements for a Japan tourist visa.
            </p>
            <div className="mt-4">
              <VisaRequirementsChecklist checklist={checklist} onToggle={handleToggleChecklistItem} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DocumentsPage() {
  return (
    <Suspense fallback={null}>
      <DocumentsPageContent />
    </Suspense>
  );
}
