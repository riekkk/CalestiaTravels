"use client";

import { CalendarDays } from "lucide-react";
import { useAllBookings } from "@/lib/admin-hooks";
import { updateBookingStatus } from "@/lib/firestore";
import { StatusSelect } from "@/components/admin/status-select";
import { EmptyState } from "@/components/portal/empty-state";
import type { BookingStatus } from "@/lib/types";

const statusOptions: BookingStatus[] = ["Requested", "Confirmed", "Completed", "Cancelled"];

export default function AdminBookingsPage() {
  const { bookings, loading } = useAllBookings(true);

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
        All Bookings
      </h1>
      <p className="mt-1 text-sm text-ink/55">
        Every tour package booking request across all clients.
      </p>

      <div className="mt-8">
        {!loading && bookings.length === 0 ? (
          <EmptyState
            icon={CalendarDays}
            title="No bookings yet"
            description="Client booking requests will appear here."
          />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-bg-light text-xs uppercase tracking-wide text-ink/50">
                <tr>
                  <th className="px-5 py-3 font-medium">Package</th>
                  <th className="px-5 py-3 font-medium">Client</th>
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
                    <td className="px-5 py-4 text-ink/65">
                      {booking.userEmail ?? booking.userId}
                    </td>
                    <td className="px-5 py-4 text-ink/65">{booking.travelDate}</td>
                    <td className="px-5 py-4 text-ink/65">{booking.pax}</td>
                    <td className="px-5 py-4">
                      <StatusSelect
                        value={booking.status}
                        options={statusOptions}
                        onChange={(next) => updateBookingStatus(booking.id, next)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
