import { getAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase-admin";
import { getSupabaseAdmin, isSupabaseConfigured, SUPABASE_BUCKETS } from "@/lib/supabase-admin";
import { verifyRequestUser } from "@/lib/api-auth";

// Deletes the Supabase Storage object for a client document. Only
// documents go through this route today (deleting a document is an
// explicit existing action); payment proofs and tour photos aren't
// deleted independently of their parent record elsewhere in the app.
export async function POST(request: Request) {
  if (!isFirebaseAdminConfigured || !isSupabaseConfigured) {
    return Response.json({ error: "File storage isn't connected yet." }, { status: 503 });
  }

  const user = await verifyRequestUser(request);
  if (!user) {
    return Response.json({ error: "Please sign in and try again." }, { status: 401 });
  }

  let body: { id?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const { id } = body;
  if (!id) {
    return Response.json({ error: "Missing id." }, { status: 400 });
  }

  const db = getAdminDb();
  const snap = await db.collection("documents").doc(id).get();
  if (!snap.exists) {
    return Response.json({ ok: true });
  }
  const data = snap.data() as Record<string, unknown>;
  const ownerId = data.userId as string;
  if (ownerId !== user.uid && !user.isAdmin) {
    return Response.json({ error: "You don't have access to this file." }, { status: 403 });
  }

  const storagePath = data.storagePath as string | undefined;
  if (storagePath) {
    const supabase = getSupabaseAdmin();
    await supabase.storage.from(SUPABASE_BUCKETS.documents).remove([storagePath]);
    // Errors here are non-fatal — the Firestore record still gets removed
    // below so the UI doesn't get stuck on an orphaned entry.
  }

  await db.collection("documents").doc(id).delete();
  return Response.json({ ok: true });
}
