export type TourQuickInfo = {
  label: string;
  value: string;
  icon: "map-pin" | "clock" | "users" | "plane";
};

export type ItineraryDay = {
  day: number;
  title: string;
  subtitle: string;
  activities: string[];
};

export type TourFaq = {
  question: string;
  answer: string;
};

export type GalleryImage = {
  slug: string;
  label: string;
};

export type TourPackage = {
  slug: string;
  status: "available" | "coming-soon";
  category: "domestic" | "international";
  title: string;
  destinationLabel: string;
  eyebrow: string;
  tagline: string;
  price: number;
  priceUnit: string;
  paxRange: string;
  departure: string;
  duration: string;
  quickInfo: TourQuickInfo[];
  highlights: string[];
  overview: string;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  gallery: GalleryImage[];
  faqs: TourFaq[];
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

export type Testimonial = {
  name: string;
  location: string;
  quote: string;
  rating: number;
  service: string;
};

export type ApplicationStatus =
  | "Submitted"
  | "In Review"
  | "Needs Documents"
  | "Approved"
  | "Rejected";

export type VisaApplication = {
  id: string;
  userId: string;
  visaType: string;
  status: ApplicationStatus;
  submittedAt: number;
  updatedAt: number;
  notes?: string;
};

export type ClientDocument = {
  id: string;
  userId: string;
  applicationId: string | null;
  fileName: string;
  storagePath: string;
  url?: string;
  uploadedAt: number;
};

export type BookingStatus = "Requested" | "Confirmed" | "Completed" | "Cancelled";

export type Booking = {
  id: string;
  userId: string;
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
  createdAt: number;
};
