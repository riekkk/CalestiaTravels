export type TourQuickInfo = {
  label: string;
  value: string;
  icon: "map-pin" | "clock" | "users" | "plane";
};

export type ItineraryDay = {
  day: number;
  title: string;
  activities: string[];
  meals?: string;
  accommodation?: string;
};

export type TourFaq = {
  question: string;
  answer: string;
};

export type TourPricing = {
  budget?: number;
  standard?: number;
  luxury?: number;
};

export type TourAvailabilityStatus = "Available" | "Limited Slots" | "Sold Out";

export type TourDateRange = {
  start: string;
  end: string;
};

// Admin publish gate — only "Active" packages are queried by the public
// site. "Draft" is unpublished/WIP, "Archived" is retired.
export type TourPublishStatus = "Active" | "Draft" | "Archived";

export type TourPackage = {
  id: string;
  slug: string;
  publishStatus: TourPublishStatus;
  category: "domestic" | "international";
  title: string;
  destinationLabel: string;
  tagline: string;
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  pricing: TourPricing;
  durationDays: number;
  durationNights: number;
  maxGroupSize: number;
  departure: string;
  photos: string[];
  coverPhotoIndex: number;
  itinerary: ItineraryDay[];
  availabilityStatus: TourAvailabilityStatus;
  remainingSlots?: number;
  dateRanges: TourDateRange[];
  faqs: TourFaq[];
  createdAt: number;
  updatedAt: number;
};

export type VisaDocument = {
  name: string;
  detail: string;
};

export type VisaType = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  notes: string[];
  requiredDocuments: VisaDocument[];
};

export type DownloadableForm = {
  name: string;
  description: string;
  fileName: string;
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  quote: string;
  createdAt: number;
};

export type ApplicationStatus =
  | "Submitted"
  | "In Review"
  | "Needs Documents"
  | "Approved"
  | "Ready for Pickup"
  | "Rejected";

// The main linear stages shown in the client-facing progress tracker.
// "Needs Documents" and "Rejected" are exception states layered on top of
// this line rather than steps within it.
export const APPLICATION_TRACKER_STAGES: ApplicationStatus[] = [
  "Submitted",
  "In Review",
  "Approved",
  "Ready for Pickup",
];

export type ApplicationStatusEvent = {
  status: ApplicationStatus;
  timestamp: number;
};

export type ApplicationAppointment = {
  type: "Submission" | "Pickup";
  date: string;
  time?: string;
  location?: string;
  notes?: string;
};

// Collected by the "Apply a Visa" wizard, one set per applicant. Optional so
// the older single-step application path (visa type + notes only) keeps
// working without backfilling old documents.
export type ApplicantDetails = {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  travelDate: string;
  // "standard" | "premium" — kept as a plain string here (rather than
  // importing ApplicationTier from payment-config) so lib/types.ts stays
  // free of app-config dependencies.
  applicationTier: string;
};

export type VisaApplication = {
  id: string;
  userId: string;
  userEmail?: string;
  visaType: string;
  status: ApplicationStatus;
  submittedAt: number;
  updatedAt: number;
  notes?: string;
  statusHistory: ApplicationStatusEvent[];
  appointment: ApplicationAppointment | null;
  documentChecklist: Record<string, boolean>;
  // Links every applicant submitted together in one "Apply a Visa" wizard
  // session, so a single Payment can cover the whole group.
  groupId?: string;
  applicant?: ApplicantDetails;
};

export type PaymentMethod = "GCash" | "Maya" | "Bank Transfer";
export type PaymentStatus = "Pending" | "Accepted" | "Re-submit Proof of Payment";

export type Payment = {
  id: string;
  userId: string;
  userEmail?: string;
  groupId: string;
  visaType: string;
  applicantCount: number;
  amount: number;
  method: PaymentMethod;
  // Path within the Supabase "payment-proofs" bucket. Private bucket, so
  // viewing always goes through /api/signed-url rather than a stored URL.
  proofOfPaymentPath: string;
  proofFileName: string;
  status: PaymentStatus;
  createdAt: number;
  updatedAt: number;
};

export type ClientDocument = {
  id: string;
  userId: string;
  userEmail?: string;
  applicationId: string | null;
  fileName: string;
  // Path within the Supabase "documents" bucket. Private bucket, so viewing
  // always goes through /api/signed-url rather than a stored public URL.
  storagePath: string;
  uploadedAt: number;
};

export type BookingStatus = "Requested" | "Confirmed" | "Completed" | "Cancelled";

export type Booking = {
  id: string;
  userId: string;
  userEmail?: string;
  packageSlug: string;
  packageName: string;
  travelDate: string;
  pax: number;
  status: BookingStatus;
  createdAt: number;
};

export type ClientNotification = {
  id: string;
  userId: string;
  applicationId: string | null;
  message: string;
  read: boolean;
  createdAt: number;
};

export type ClientProfile = {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  isAdmin?: boolean;
  agreedToTerms?: boolean;
  agreedToPrivacy?: boolean;
  termsVersion?: string;
  privacyVersion?: string;
  agreedAt?: number;
  createdAt: number;
};
