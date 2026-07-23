import { isFirebaseAdminConfigured } from "@/lib/firebase-admin";
import { getSupabaseAdmin, isSupabaseConfigured, SUPABASE_BUCKETS } from "@/lib/supabase-admin";
import { verifyRequestUser } from "@/lib/api-auth";
import { MAX_UPLOAD_SIZE_BYTES } from "@/lib/upload-config";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

type UploadKind = "tour-photo" | "document" | "payment-proof";

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-100);
}

export async function POST(request: Request) {
  if (!isFirebaseAdminConfigured || !isSupabaseConfigured) {
    return Response.json(
      { error: "File uploads aren't connected yet. Please contact us directly." },
      { status: 503 }
    );
  }

  const user = await verifyRequestUser(request);
  if (!user) {
    return Response.json({ error: "Please sign in and try again." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const kind = formData.get("kind") as UploadKind | null;

  if (!(file instanceof File) || !kind) {
    return Response.json({ error: "Missing file or upload type." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return Response.json(
      { error: "Unsupported file type. Please upload a JPG, PNG, or PDF." },
      { status: 400 }
    );
  }
  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    return Response.json({ error: "File is too large." }, { status: 400 });
  }

  let bucket: string;
  let pathPrefix: string;
  let isPublicBucket: boolean;

  if (kind === "tour-photo") {
    if (!user.isAdmin) {
      return Response.json({ error: "Admin access required." }, { status: 403 });
    }
    bucket = SUPABASE_BUCKETS.tourPhotos;
    pathPrefix = "tours";
    isPublicBucket = true;
  } else if (kind === "document") {
    bucket = SUPABASE_BUCKETS.documents;
    pathPrefix = `users/${user.uid}`;
    isPublicBucket = false;
  } else if (kind === "payment-proof") {
    bucket = SUPABASE_BUCKETS.paymentProofs;
    pathPrefix = `users/${user.uid}`;
    isPublicBucket = false;
  } else {
    return Response.json({ error: "Unknown upload type." }, { status: 400 });
  }

  const path = `${pathPrefix}/${Date.now()}-${sanitizeFileName(file.name)}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  const supabase = getSupabaseAdmin();
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, bytes, { contentType: file.type, upsert: false });

  if (uploadError) {
    return Response.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }

  if (isPublicBucket) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return Response.json({ path, url: data.publicUrl });
  }

  const { data: signedData, error: signError } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, 600);

  if (signError || !signedData) {
    return Response.json({ error: "Upload succeeded but preview failed." }, { status: 500 });
  }

  return Response.json({ path, url: signedData.signedUrl });
}
