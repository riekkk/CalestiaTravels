import "server-only";
import { getAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase-admin";

// Server-only helper used exclusively for generateMetadata on the tour
// detail page, so crawlers/link previews get a real title+description
// without waiting on the client-side Firestore subscription. The page body
// itself still reads live via useTourPackage() for real-time admin edits.
export async function adminGetTourPackageBySlug(slug: string): Promise<{
  title: string;
  tagline: string;
  photos: string[];
  coverPhotoIndex: number;
} | null> {
  if (!isFirebaseAdminConfigured) return null;
  const db = getAdminDb();
  const snap = await db
    .collection("tourPackages")
    .where("slug", "==", slug)
    .where("publishStatus", "==", "Active")
    .limit(1)
    .get();
  if (snap.empty) return null;
  const data = snap.docs[0].data();
  return {
    title: data.title ?? "",
    tagline: data.tagline ?? "",
    photos: Array.isArray(data.photos) ? data.photos : [],
    coverPhotoIndex: typeof data.coverPhotoIndex === "number" ? data.coverPhotoIndex : 0,
  };
}

// Used by sitemap.ts so published tour packages are discoverable without a
// code redeploy every time the admin publishes a new one.
export async function adminGetActiveTourSlugs(): Promise<string[]> {
  if (!isFirebaseAdminConfigured) return [];
  const db = getAdminDb();
  const snap = await db.collection("tourPackages").where("publishStatus", "==", "Active").get();
  return snap.docs.map((doc) => doc.data().slug).filter((slug): slug is string => Boolean(slug));
}
