"use client";

import { FileText } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useDocuments } from "@/lib/portal-hooks";
import { uploadClientDocument } from "@/lib/firestore";
import { FileUpload } from "@/components/portal/file-upload";
import { EmptyState } from "@/components/portal/empty-state";
import { formatDate } from "@/lib/utils";

export default function DocumentsPage() {
  const { user } = useAuth();
  const { documents, loading } = useDocuments(user?.uid);

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
        My Documents
      </h1>
      <p className="mt-1 text-sm text-ink/55">
        Upload and manage the documents you&apos;ve submitted across all applications.
      </p>

      <div className="mt-6 max-w-xl">
        <FileUpload
          onUpload={async (file) => {
            if (!user) return;
            await uploadClientDocument(user.uid, user.email ?? "", file, null);
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
