"use client";

import { useState } from "react";
import { CalendarDays, Plus } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useBookings } from "@/lib/portal-hooks";
import { BookingStatusBadge } from "@/components/portal/status-badge";
import { EmptyState } from "@/components/portal/empty-state";
import { BookingRequestForm } from "@/components/portal/booking-request-form";
import { Button } from "@/components/ui/button";

export default function BookingsPage() {
  const { user } = useAuth();
  const { bookings, loading } = useBookings(user?.uid);
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
            My Bookings
          </h1>
          <p className="mt-1 text-sm text-ink/55">
            Your tour package booking requests and their status.
          </p>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}>
          <Plus className="h-4 w-4" />
          {showForm ? "Close" : "Request a Booking"}
        </Button>
      </div>

      {showForm && (
        <div className="mb-8">
          <BookingRequestForm onDone={() => setShowForm(false)} />
        </div>
      )}

      {!loading && bookings.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="No bookings yet"
          description="Request a slot on one of our tour packages and track its status here."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-light text-xs uppercase tracking-wide text-ink/50">
              <tr>
                <th className="px-5 py-3 font-medium">Package</th>
                <th className="px-5 py-3 font-medium">Travel Date</th>
                <th className="px-5 py-3 font-medium">Pax</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-5 py-4 font-medium text-primary-dark">
                    {booking.packageName}
                  </td>
                  <td className="px-5 py-4 text-ink/65">{booking.travelDate}</td>
                  <td className="px-5 py-4 text-ink/65">{booking.pax}</td>
                  <td className="px-5 py-4">
                    <BookingStatusBadge status={booking.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
