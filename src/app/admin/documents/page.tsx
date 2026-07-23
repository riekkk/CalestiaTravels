"use client";

import { useState } from "react";
import { FileText, Loader2, Trash2 } from "lucide-react";
import { useAllDocuments } from "@/lib/admin-hooks";
import { deleteClientDocument } from "@/lib/firestore";
import { EmptyState } from "@/components/portal/empty-state";
import { formatDate } from "@/lib/utils";

export default function AdminDocumentsPage() {
  const { documents, loading } = useAllDocuments(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string, storagePath: string) {
    if (!confirm("Delete this document? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await deleteClientDocument(id, storagePath);
    } finally {
      setDeletingId(null);
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
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 font-medium text-primary-dark hover:underline"
                      >
                        <FileText className="h-4 w-4 shrink-0 text-primary" />
                        {doc.fileName}
                      </a>
                    </td>
                    <td className="px-5 py-4 text-ink/65">{doc.userEmail ?? doc.userId}</td>
                    <td className="px-5 py-4 text-ink/65">{formatDate(doc.uploadedAt)}</td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(doc.id, doc.storagePath)}
                        disabled={deletingId === doc.id}
                        className="text-red-500 hover:text-red-600 disabled:opacity-50"
                        aria-label="Delete document"
                      >
                        {deletingId === doc.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
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
