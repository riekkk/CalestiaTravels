import "server-only";
import { getAuth } from "firebase-admin/auth";
import { getAdminApp } from "@/lib/firebase-admin";

// Split out from firebase-admin.ts on purpose — see the comment there.
// Only import this file from routes that actually verify ID tokens
// (the upload/signed-url/delete-file API routes via api-auth.ts).
export function getAdminAuth() {
  return getAuth(getAdminApp());
}
