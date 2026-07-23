import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// getAdminAuth() lives in ./firebase-admin-auth.ts instead of here on
// purpose: firebase-admin/auth pulls in jwks-rsa -> jose (ESM), which
// Vercel's serverless bundler chokes on. Keeping that import out of this
// file means anything that only needs Firestore (tour lookups, sitemap)
// never touches that dependency chain at all.
const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

export const isFirebaseAdminConfigured = Boolean(projectId && clientEmail && privateKey);

let app: App | undefined;

export function getAdminApp(): App {
  if (!isFirebaseAdminConfigured) {
    throw new Error("Firebase Admin is not configured yet.");
  }
  if (!app) {
    app = getApps().length
      ? getApps()[0]
      : initializeApp({
          credential: cert({ projectId, clientEmail, privateKey }),
        });
  }
  return app;
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}
