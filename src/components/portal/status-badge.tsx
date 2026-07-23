import { Badge } from "@/components/ui/badge";
import type { ApplicationStatus, BookingStatus, PaymentStatus } from "@/lib/types";

const applicationTone: Record<ApplicationStatus, "primary" | "success" | "warning" | "danger"> = {
  Submitted: "primary",
  "In Review": "warning",
  "Needs Documents": "warning",
  Approved: "success",
  "Ready for Pickup": "success",
  Rejected: "danger",
};

const bookingTone: Record<BookingStatus, "primary" | "success" | "warning" | "neutral"> = {
  Requested: "primary",
  Confirmed: "success",
  Completed: "neutral",
  Cancelled: "warning",
};

export function ApplicationStatusBadge({ status }: { status: ApplicationStatus }) {
  return <Badge tone={applicationTone[status]}>{status}</Badge>;
}

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return <Badge tone={bookingTone[status]}>{status}</Badge>;
}

const paymentTone: Record<PaymentStatus, "primary" | "success" | "warning" | "danger"> = {
  Pending: "warning",
  Accepted: "success",
  "Re-submit Proof of Payment": "danger",
};

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return <Badge tone={paymentTone[status]}>{status}</Badge>;
}
