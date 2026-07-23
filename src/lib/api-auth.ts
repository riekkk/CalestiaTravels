import "server-only";
import { getAdminDb } from "@/lib/firebase-admin";
import { getAdminAuth } from "@/lib/firebase-admin-auth";

// Shared by every upload-related API route: verifies the Firebase ID token
// the client sent in the Authorization header, then checks the matching
// Firestore user doc for isAdmin. Nothing here is Supabase-specific — this
// is purely "who is making this request," per the existing Firebase Auth
// session, regardless of which storage backend the route talks to.
export async function verifyRequestUser(
  request: Request
): Promise<{ uid: string; isAdmin: boolean } | null> {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return null;

  try {
    const decoded = await getAdminAuth().verifyIdToken(token);
    const userDoc = await getAdminDb().collection("users").doc(decoded.uid).get();
    const isAdmin = userDoc.exists && userDoc.data()?.isAdmin === true;
    return { uid: decoded.uid, isAdmin };
  } catch {
    return null;
  }
}
