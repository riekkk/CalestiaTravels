"use client";

import type { User } from "firebase/auth";

export type UploadKind = "tour-photo" | "document" | "payment-proof";
export type UploadResult = { path: string; url: string };

export async function uploadFile(
  user: User,
  file: File,
  kind: UploadKind
): Promise<UploadResult> {
  const token = await user.getIdToken();
  const formData = new FormData();
  formData.append("file", file);
  formData.append("kind", kind);

  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw new Error(payload.error || "Upload failed. Please try again.");
  }
  return res.json();
}

export async function getSignedFileUrl(
  user: User,
  kind: "document" | "payment-proof",
  id: string
): Promise<string> {
  const token = await user.getIdToken();
  const res = await fetch("/api/signed-url", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ kind, id }),
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw new Error(payload.error || "Unable to load file.");
  }
  const data = await res.json();
  return data.url;
}

export async function deleteUploadedDocument(user: User, id: string): Promise<void> {
  const token = await user.getIdToken();
  const res = await fetch("/api/delete-file", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw new Error(payload.error || "Delete failed. Please try again.");
  }
}
