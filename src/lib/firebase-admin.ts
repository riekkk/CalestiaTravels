import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

export const isFirebaseAdminConfigured = Boolean(projectId && clientEmail && privateKey);

let app: App | undefined;

function getAdminApp(): App {
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
