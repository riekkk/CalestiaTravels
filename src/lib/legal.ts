import type { ClientProfile } from "@/lib/types";

// Bump these (e.g. to "2026-11") whenever /terms or /privacy content
// materially changes. Existing users keep whatever version they agreed to
// on their profile — needsReconsent() below is the hook a future gate
// (e.g. a blocking modal in the portal layout) would use to detect the
// mismatch and prompt them to re-agree. No gate exists yet — this just
// keeps the data model ready for one without a rewrite.
export const CURRENT_TERMS_VERSION = "2026-07";
export const CURRENT_PRIVACY_VERSION = "2026-07";

export function needsReconsent(
  profile: Pick<ClientProfile, "termsVersion" | "privacyVersion"> | null | undefined
): boolean {
  if (!profile) return false;
  return (
    profile.termsVersion !== CURRENT_TERMS_VERSION ||
    profile.privacyVersion !== CURRENT_PRIVACY_VERSION
  );
}
