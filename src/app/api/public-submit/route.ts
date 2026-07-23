import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase-admin";

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
const SCORE_THRESHOLD = 0.5;

type InquiryData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type BookingLeadData = {
  name: string;
  email: string;
  phone: string;
  packageSlug: string;
  packageName: string;
  travelDate: string;
  pax: number;
  message?: string;
};

type ReviewData = {
  name: string;
  rating: number;
  quote: string;
};

type RequestBody =
  | { type: "inquiry"; recaptchaToken: string; data: InquiryData }
  | { type: "bookingLead"; recaptchaToken: string; data: BookingLeadData }
  | { type: "review"; recaptchaToken: string; data: ReviewData };

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validateInquiry(data: unknown): data is InquiryData {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    isNonEmptyString(d.name) &&
    isNonEmptyString(d.email) &&
    isNonEmptyString(d.phone) &&
    isNonEmptyString(d.message)
  );
}

function validateBookingLead(data: unknown): data is BookingLeadData {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    isNonEmptyString(d.name) &&
    isNonEmptyString(d.email) &&
    isNonEmptyString(d.phone) &&
    isNonEmptyString(d.packageSlug) &&
    isNonEmptyString(d.packageName) &&
    isNonEmptyString(d.travelDate) &&
    typeof d.pax === "number"
  );
}

function validateReview(data: unknown): data is ReviewData {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    isNonEmptyString(d.name) &&
    isNonEmptyString(d.quote) &&
    d.name.length <= 100 &&
    d.quote.length <= 1000 &&
    typeof d.rating === "number" &&
    Number.isInteger(d.rating) &&
    d.rating >= 1 &&
    d.rating <= 5
  );
}

async function verifyRecaptcha(token: string): Promise<{ ok: boolean; score?: number }> {
  if (!RECAPTCHA_SECRET) return { ok: false };
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret: RECAPTCHA_SECRET, response: token }),
  });
  const json = (await res.json()) as { success: boolean; score?: number };
  if (!json.success) return { ok: false };
  if (typeof json.score === "number" && json.score < SCORE_THRESHOLD) {
    return { ok: false, score: json.score };
  }
  return { ok: true, score: json.score };
}

export async function POST(request: Request) {
  if (!isFirebaseAdminConfigured) {
    return Response.json(
      { error: "Server isn't configured yet. Please contact us directly." },
      { status: 503 }
    );
  }
  if (!RECAPTCHA_SECRET) {
    return Response.json(
      { error: "Spam protection isn't configured yet. Please contact us directly." },
      { status: 503 }
    );
  }

  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body || !isNonEmptyString(body.recaptchaToken)) {
    return Response.json({ error: "Missing verification token." }, { status: 400 });
  }

  const verification = await verifyRecaptcha(body.recaptchaToken);
  if (!verification.ok) {
    return Response.json(
      { error: "We couldn't verify your submission. Please try again." },
      { status: 400 }
    );
  }

  const db = getAdminDb();

  if (body.type === "inquiry") {
    if (!validateInquiry(body.data)) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }
    await db.collection("inquiries").add({
      ...body.data,
      createdAt: FieldValue.serverTimestamp(),
    });
    return Response.json({ ok: true });
  }

  if (body.type === "bookingLead") {
    if (!validateBookingLead(body.data)) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }
    await db.collection("bookingLeads").add({
      ...body.data,
      createdAt: FieldValue.serverTimestamp(),
    });
    return Response.json({ ok: true });
  }

  if (body.type === "review") {
    if (!validateReview(body.data)) {
      return Response.json({ error: "Missing or invalid fields." }, { status: 400 });
    }
    await db.collection("reviews").add({
      ...body.data,
      createdAt: FieldValue.serverTimestamp(),
    });
    return Response.json({ ok: true });
  }

  return Response.json({ error: "Unknown submission type." }, { status: 400 });
}
