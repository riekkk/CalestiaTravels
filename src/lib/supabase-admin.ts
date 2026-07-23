import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Storage-only integration: no Supabase Auth, no Supabase database usage.
// Firebase Auth stays the single source of truth for identity — every
// upload/read/delete route verifies a Firebase ID token first, then uses
// this service-role client (which bypasses Supabase's own row-level
// security) to talk to Storage. This keeps the two backends fully
// independent: nothing here touches Firebase, and Firebase never touches
// Supabase.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(url && serviceRoleKey);

export const SUPABASE_BUCKETS = {
  tourPhotos: "tour-photos",
  documents: "documents",
  paymentProofs: "payment-proofs",
} as const;

let client: SupabaseClient | undefined;

export function getSupabaseAdmin(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured yet.");
  }
  if (!client) {
    client = createClient(url as string, serviceRoleKey as string, {
      auth: { persistSession: false },
    });
  }
  return client;
}
