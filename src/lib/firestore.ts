import {
  addDoc,
  collection,
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
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import type {
  ApplicationStatus,
  Booking,
  ClientDocument,
  ClientNotification,
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
    callback(
      snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          userId: data.userId,
          visaType: data.visaType,
          status: data.status,
          submittedAt: toMillis(data.submittedAt),
          updatedAt: toMillis(data.updatedAt),
          notes: data.notes ?? "",
        } satisfies VisaApplication;
      })
    );
  });
}

export async function createApplication(
  userId: string,
  visaType: string,
  notes: string
) {
  await addDoc(collection(requireDb(), "applications"), {
    userId,
    visaType,
    status: "Submitted" satisfies ApplicationStatus,
    notes,
    submittedAt: serverTimestamp(),
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
    callback(
      snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          userId: data.userId,
          applicationId: data.applicationId ?? null,
          fileName: data.fileName,
          storagePath: data.storagePath,
          url: data.url,
          uploadedAt: toMillis(data.uploadedAt),
        } satisfies ClientDocument;
      })
    );
  });
}

export async function uploadClientDocument(
  userId: string,
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
    applicationId,
    fileName: file.name,
    storagePath: path,
    url,
    uploadedAt: serverTimestamp(),
  });
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
    callback(
      snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          userId: data.userId,
          packageSlug: data.packageSlug,
          packageName: data.packageName,
          travelDate: data.travelDate,
          pax: data.pax,
          status: data.status,
          createdAt: toMillis(data.createdAt),
        } satisfies Booking;
      })
    );
  });
}

export async function createBookingRequest(
  userId: string,
  packageSlug: string,
  packageName: string,
  travelDate: string,
  pax: number
) {
  await addDoc(collection(requireDb(), "bookings"), {
    userId,
    packageSlug,
    packageName,
    travelDate,
    pax,
    status: "Requested",
    createdAt: serverTimestamp(),
  });
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

export async function updateClientProfile(
  userId: string,
  data: { name?: string; phone?: string; address?: string }
) {
  await updateDoc(doc(requireDb(), "users", userId), data);
}

export async function submitInquiry(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  await addDoc(collection(requireDb(), "inquiries"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function submitPackageBookingLead(data: {
  name: string;
  email: string;
  phone: string;
  packageSlug: string;
  packageName: string;
  travelDate: string;
  pax: number;
  message?: string;
}) {
  await addDoc(collection(requireDb(), "bookingLeads"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}
