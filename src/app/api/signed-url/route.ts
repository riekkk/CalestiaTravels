import { getAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase-admin";
import { getSupabaseAdmin, isSupabaseConfigured, SUPABASE_BUCKETS } from "@/lib/supabase-admin";
import { verifyRequestUser } from "@/lib/api-auth";

type FileKind = "document" | "payment-proof";

// Takes a Firestore document ID (not a raw storage path) so we can look up
// the owner ourselves and authorize server-side, rather than trusting a
// client-supplied path that could be edited to probe another client's file.
export async function POST(request: Request) {
  if (!isFirebaseAdminConfigured || !isSupabaseConfigured) {
    return Response.json({ error: "File storage isn't connected yet." }, { status: 503 });
  }

  const user = await verifyRequestUser(request);
  if (!user) {
    return Response.json({ error: "Please sign in and try again." }, { status: 401 });
  }

  let body: { kind?: FileKind; id?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const { kind, id } = body;
  if (!kind || !id) {
    return Response.json({ error: "Missing kind or id." }, { status: 400 });
  }

  const db = getAdminDb();
  const collectionName = kind === "document" ? "documents" : kind === "payment-proof" ? "payments" : null;
  if (!collectionName) {
    return Response.json({ error: "Unknown file kind." }, { status: 400 });
  }

  const snap = await db.collection(collectionName).doc(id).get();
  if (!snap.exists) {
    return Response.json({ error: "Not found." }, { status: 404 });
  }
  const data = snap.data() as Record<string, unknown>;
  const ownerId = data.userId as string;
  if (ownerId !== user.uid && !user.isAdmin) {
    return Response.json({ error: "You don't have access to this file." }, { status: 403 });
  }

  const storagePath =
    kind === "document" ? (data.storagePath as string) : (data.proofOfPaymentPath as string);
  if (!storagePath) {
    return Response.json({ error: "No file on record." }, { status: 404 });
  }

  const bucket = kind === "document" ? SUPABASE_BUCKETS.documents : SUPABASE_BUCKETS.paymentProofs;
  const supabase = getSupabaseAdmin();
  const { data: signedData, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(storagePath, 300);

  if (error || !signedData) {
    return Response.json({ error: "Unable to load file." }, { status: 500 });
  }

  return Response.json({ url: signedData.signedUrl });
}
