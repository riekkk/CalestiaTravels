// Client-safe check (no "server-only" guard, no service-role key involved)
// for whether file uploads are wired up. Mirrors isFirebaseConfigured /
// isRecaptchaConfigured — the project URL itself isn't secret, only the
// service-role key is, and that never leaves the server.
export const isUploadConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

// Kept just under Vercel's ~4.5MB serverless request body limit so uploads
// fail with a clear client-side message instead of an opaque 413 on prod.
export const MAX_UPLOAD_SIZE_BYTES = 4 * 1024 * 1024;
export const MAX_UPLOAD_SIZE_LABEL = "4MB";
