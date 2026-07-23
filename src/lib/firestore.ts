import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type Timestamp,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import type {
  ApplicationAppointment,
  ApplicationStatus,
  Booking,
  BookingStatus,
  ClientDocument,
  ClientNotification,
  ClientProfile,
  TourPackage,
  VisaApplication,
} from "@/lib/types";

function requireDb() {
  if (!db) throw new Error("Firebase is not configured yet.");
  return db;
}

function toMillis(value: unknown): number {
  if (value && typeof value === "object" && "toMillis" in value) {
    return (value as Timestamp).toMillis();
  }
  return Date.now();
}

function mapApplication(id: string, data: Record<string, unknown>): VisaApplication {
  return {
    id,
    userId: data.userId as string,
    userEmail: data.userEmail as string | undefined,
    visaType: data.visaType as string,
    status: data.status as ApplicationStatus,
    submittedAt: toMillis(data.submittedAt),
    updatedAt: toMillis(data.updatedAt),
    notes: (data.notes as string) ?? "",
    statusHistory: Array.isArray(data.statusHistory)
      ? (data.statusHistory as VisaApplication["statusHistory"])
      : [],
    appointment: (data.appointment as ApplicationAppointment | null) ?? null,
    documentChecklist: (data.documentChecklist as Record<string, boolean>) ?? {},
  };
}

function mapDocument(id: string, data: Record<string, unknown>): ClientDocument {
  return {
    id,
    userId: data.userId as string,
    userEmail: data.userEmail as string | undefined,
    applicationId: (data.applicationId as string) ?? null,
    fileName: data.fileName as string,
    storagePath: data.storagePath as string,
    url: data.url as string | undefined,
    uploadedAt: toMillis(data.uploadedAt),
  };
}

function mapBooking(id: string, data: Record<string, unknown>): Booking {
  return {
    id,
    userId: data.userId as string,
    userEmail: data.userEmail as string | undefined,
    packageSlug: data.packageSlug as string,
    packageName: data.packageName as string,
    travelDate: data.travelDate as string,
    pax: data.pax as number,
    status: data.status as BookingStatus,
    createdAt: toMillis(data.createdAt),
  };
}

export function subscribeToApplications(
  userId: string,
  callback: (applications: VisaApplication[]) => void
) {
  const q = query(
    collection(requireDb(), "applications"),
    where("userId", "==", userId),
    orderBy("submittedAt", "desc")
  );
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((docSnap) => mapApplication(docSnap.id, docSnap.data())));
  });
}

// Admin-only: every client profile, used to attach a display name to the
// Clients list (applications/bookings only denormalize email, not name).
export function subscribeToAllUsers(callback: (users: ClientProfile[]) => void) {
  const q = collection(requireDb(), "users");
  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          uid: docSnap.id,
          name: data.name ?? "",
          email: data.email ?? "",
          phone: data.phone,
          address: data.address,
          isAdmin: data.isAdmin === true,
          createdAt: toMillis(data.createdAt),
        } satisfies ClientProfile;
      })
    );
  });
}

export function subscribeToAllApplications(
  callback: (applications: VisaApplication[]) => void
) {
  const q = query(collection(requireDb(), "applications"), orderBy("submittedAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((docSnap) => mapApplication(docSnap.id, docSnap.data())));
  });
}

export async function createApplication(
  userId: string,
  userEmail: string,
  visaType: string,
  notes: string
) {
  await addDoc(collection(requireDb(), "applications"), {
    userId,
    userEmail,
    visaType,
    status: "Submitted" satisfies ApplicationStatus,
    notes,
    statusHistory: [{ status: "Submitted" satisfies ApplicationStatus, timestamp: Date.now() }],
    appointment: null,
    documentChecklist: {},
    submittedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

// Admin-driven status change. Appends to statusHistory (client-side
// timestamp — Firestore's serverTimestamp() sentinel can't be used inside
// arrayUnion()) and notifies the client, so the client's tracker and
// activity feed update automatically.
export async function updateApplicationStatus(
  applicationId: string,
  userId: string,
  visaType: string,
  status: ApplicationStatus
) {
  await updateDoc(doc(requireDb(), "applications", applicationId), {
    status,
    statusHistory: arrayUnion({ status, timestamp: Date.now() }),
    updatedAt: serverTimestamp(),
  });
  await sendNotificationToUser(
    userId,
    `Your ${visaType} application status has been updated to "${status}".`,
    applicationId
  );
}

// Internal staff notes only — no notification, no status/history change.
export async function updateApplicationNotes(applicationId: string, notes: string) {
  await updateDoc(doc(requireDb(), "applications", applicationId), {
    notes,
    updatedAt: serverTimestamp(),
  });
}

export async function setApplicationAppointment(
  applicationId: string,
  userId: string,
  visaType: string,
  appointment: ApplicationAppointment
) {
  await updateDoc(doc(requireDb(), "applications", applicationId), {
    appointment,
    updatedAt: serverTimestamp(),
  });
  const when = appointment.time ? `${appointment.date} at ${appointment.time}` : appointment.date;
  await sendNotificationToUser(
    userId,
    `Your ${visaType} ${appointment.type.toLowerCase()} appointment has been scheduled for ${when}${
      appointment.location ? ` at ${appointment.location}` : ""
    }.`,
    applicationId
  );
}

export async function setDocumentChecklistItem(
  applicationId: string,
  documentName: string,
  received: boolean
) {
  await updateDoc(doc(requireDb(), "applications", applicationId), {
    [`documentChecklist.${documentName}`]: received,
    updatedAt: serverTimestamp(),
  });
}

export function subscribeToDocuments(
  userId: string,
  callback: (documents: ClientDocument[]) => void
) {
  const q = query(
    collection(requireDb(), "documents"),
    where("userId", "==", userId),
    orderBy("uploadedAt", "desc")
  );
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((docSnap) => mapDocument(docSnap.id, docSnap.data())));
  });
}

export function subscribeToAllDocuments(
  callback: (documents: ClientDocument[]) => void
) {
  const q = query(collection(requireDb(), "documents"), orderBy("uploadedAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((docSnap) => mapDocument(docSnap.id, docSnap.data())));
  });
}

export async function uploadClientDocument(
  userId: string,
  userEmail: string,
  file: File,
  applicationId: string | null
) {
  if (!storage) throw new Error("Firebase is not configured yet.");
  const path = `users/${userId}/documents/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  await addDoc(collection(requireDb(), "documents"), {
    userId,
    userEmail,
    applicationId,
    fileName: file.name,
    storagePath: path,
    url,
    uploadedAt: serverTimestamp(),
  });
}

export async function deleteClientDocument(documentId: string, storagePath: string) {
  if (storage) {
    await deleteObject(ref(storage, storagePath)).catch(() => {
      // Already gone from Storage — still remove the Firestore record.
    });
  }
  await deleteDoc(doc(requireDb(), "documents", documentId));
}

export function subscribeToBookings(
  userId: string,
  callback: (bookings: Booking[]) => void
) {
  const q = query(
    collection(requireDb(), "bookings"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((docSnap) => mapBooking(docSnap.id, docSnap.data())));
  });
}

export function subscribeToAllBookings(callback: (bookings: Booking[]) => void) {
  const q = query(collection(requireDb(), "bookings"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((docSnap) => mapBooking(docSnap.id, docSnap.data())));
  });
}

export async function createBookingRequest(
  userId: string,
  userEmail: string,
  packageSlug: string,
  packageName: string,
  travelDate: string,
  pax: number
) {
  await addDoc(collection(requireDb(), "bookings"), {
    userId,
    userEmail,
    packageSlug,
    packageName,
    travelDate,
    pax,
    status: "Requested" satisfies BookingStatus,
    createdAt: serverTimestamp(),
  });
}

export async function updateBookingStatus(bookingId: string, status: BookingStatus) {
  await updateDoc(doc(requireDb(), "bookings", bookingId), { status });
}

export function subscribeToNotifications(
  userId: string,
  callback: (notifications: ClientNotification[]) => void
) {
  const q = query(
    collection(requireDb(), "notifications"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          userId: data.userId,
          applicationId: data.applicationId ?? null,
          message: data.message,
          read: data.read,
          createdAt: toMillis(data.createdAt),
        } satisfies ClientNotification;
      })
    );
  });
}

export async function markNotificationRead(notificationId: string) {
  await updateDoc(doc(requireDb(), "notifications", notificationId), {
    read: true,
  });
}

export async function sendNotificationToUser(
  userId: string,
  message: string,
  applicationId: string | null = null
) {
  await addDoc(collection(requireDb(), "notifications"), {
    userId,
    applicationId,
    message,
    read: false,
    createdAt: serverTimestamp(),
  });
}

export async function updateClientProfile(
  userId: string,
  data: { name?: string; phone?: string; address?: string }
) {
  await updateDoc(doc(requireDb(), "users", userId), data);
}

function mapTourPackage(id: string, data: Record<string, unknown>): TourPackage {
  return {
    id,
    slug: data.slug as string,
    publishStatus: (data.publishStatus as TourPackage["publishStatus"]) ?? "Draft",
    category: data.category as TourPackage["category"],
    title: data.title as string,
    destinationLabel: data.destinationLabel as string,
    tagline: (data.tagline as string) ?? "",
    overview: (data.overview as string) ?? "",
    highlights: (data.highlights as string[]) ?? [],
    inclusions: (data.inclusions as string[]) ?? [],
    exclusions: (data.exclusions as string[]) ?? [],
    pricing: (data.pricing as TourPackage["pricing"]) ?? {},
    durationDays: (data.durationDays as number) ?? 0,
    durationNights: (data.durationNights as number) ?? 0,
    maxGroupSize: (data.maxGroupSize as number) ?? 0,
    departure: (data.departure as string) ?? "Manila",
    photos: (data.photos as string[]) ?? [],
    coverPhotoIndex: (data.coverPhotoIndex as number) ?? 0,
    itinerary: (data.itinerary as TourPackage["itinerary"]) ?? [],
    availabilityStatus: (data.availabilityStatus as TourPackage["availabilityStatus"]) ?? "Available",
    remainingSlots: data.remainingSlots as number | undefined,
    dateRanges: (data.dateRanges as TourPackage["dateRanges"]) ?? [],
    faqs: (data.faqs as TourPackage["faqs"]) ?? [],
    createdAt: toMillis(data.createdAt),
    updatedAt: toMillis(data.updatedAt),
  };
}

// Public site — only packages the admin has published.
export function subscribeToActiveTourPackages(
  callback: (tours: TourPackage[]) => void
) {
  const q = query(collection(requireDb(), "tourPackages"), where("publishStatus", "==", "Active"));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((docSnap) => mapTourPackage(docSnap.id, docSnap.data())));
  });
}

export function subscribeToTourPackageBySlug(
  slug: string,
  callback: (tour: TourPackage | null) => void
) {
  const q = query(collection(requireDb(), "tourPackages"), where("slug", "==", slug));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.empty ? null : mapTourPackage(snapshot.docs[0].id, snapshot.docs[0].data()));
  });
}

// Admin — every package regardless of publish status.
export function subscribeToAllTourPackages(callback: (tours: TourPackage[]) => void) {
  const q = query(collection(requireDb(), "tourPackages"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((docSnap) => mapTourPackage(docSnap.id, docSnap.data())));
  });
}

export async function createTourPackage(
  data: Omit<TourPackage, "id" | "createdAt" | "updatedAt">
) {
  const ref = await addDoc(collection(requireDb(), "tourPackages"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateTourPackage(
  id: string,
  data: Partial<Omit<TourPackage, "id" | "createdAt" | "updatedAt">>
) {
  await updateDoc(doc(requireDb(), "tourPackages", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteTourPackage(id: string) {
  await deleteDoc(doc(requireDb(), "tourPackages", id));
}

async function postPublicSubmission(body: unknown) {
  const res = await fetch("/api/public-submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw new Error(payload.error || "Unable to submit — please try again.");
  }
}

// These two go through the /api/public-submit route (server-verified
// reCAPTCHA + Firebase Admin SDK) rather than the client Firestore SDK —
// Firestore rules deny direct client writes to these collections so a bot
// can't bypass the recaptcha check by calling Firestore directly.
export async function submitInquiry(
  data: { name: string; email: string; phone: string; message: string },
  recaptchaToken: string
) {
  await postPublicSubmission({ type: "inquiry", recaptchaToken, data });
}

export async function submitPackageBookingLead(
  data: {
    name: string;
    email: string;
    phone: string;
    packageSlug: string;
    packageName: string;
    travelDate: string;
    pax: number;
    message?: string;
  },
  recaptchaToken: string
) {
  await postPublicSubmission({ type: "bookingLead", recaptchaToken, data });
}
