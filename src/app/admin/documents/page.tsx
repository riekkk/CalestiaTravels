"use client";

import { useState } from "react";
import { ExternalLink, FileText, Loader2, Trash2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useAllDocuments } from "@/lib/admin-hooks";
import { getSignedFileUrl, deleteUploadedDocument } from "@/lib/upload";
import { EmptyState } from "@/components/portal/empty-state";
import { formatDate } from "@/lib/utils";

export default function AdminDocumentsPage() {
  const { user } = useAuth();
  const { documents, loading } = useAllDocuments(true);
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

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
        All Documents
      </h1>
      <p className="mt-1 text-sm text-ink/55">
        Every document uploaded by clients, across all applications.
      </p>

      <div className="mt-8">
        {!loading && documents.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No documents uploaded yet"
            description="Client-uploaded documents will appear here."
          />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-bg-light text-xs uppercase tracking-wide text-ink/50">
                <tr>
                  <th className="px-5 py-3 font-medium">File</th>
                  <th className="px-5 py-3 font-medium">Client</th>
                  <th className="px-5 py-3 font-medium">Uploaded</th>
                  <th className="px-5 py-3 font-medium" />
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                {documents.map((doc) => (
                  <tr key={doc.id}>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => handleView(doc.id)}
                        disabled={busyId === doc.id}
                        className="flex items-center gap-2 font-medium text-primary-dark hover:underline disabled:opacity-50"
                      >
                        {busyId === doc.id ? (
                          <Loader2 className="h-4 w-4 shrink-0 animate-spin text-primary" />
                        ) : (
                          <FileText className="h-4 w-4 shrink-0 text-primary" />
                        )}
                        {doc.fileName}
                        <ExternalLink className="h-3 w-3 shrink-0 text-ink/30" />
                      </button>
                    </td>
                    <td className="px-5 py-4 text-ink/65">{doc.userEmail ?? doc.userId}</td>
                    <td className="px-5 py-4 text-ink/65">{formatDate(doc.uploadedAt)}</td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(doc.id)}
                        disabled={busyId === doc.id}
                        className="text-red-500 hover:text-red-600 disabled:opacity-50"
                        aria-label="Delete document"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
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
