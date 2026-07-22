"use client";

import { Bell } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useNotifications } from "@/lib/portal-hooks";
import { markNotificationRead } from "@/lib/firestore";
import { EmptyState } from "@/components/portal/empty-state";
import { cn, formatDate } from "@/lib/utils";

export default function NotificationsPage() {
  const { user } = useAuth();
  const { notifications, loading } = useNotifications(user?.uid);

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
        Notifications
      </h1>
      <p className="mt-1 text-sm text-ink/55">
        Updates about your applications and bookings.
      </p>

      <div className="mt-8">
        {!loading && notifications.length === 0 ? (
          <EmptyState
            icon={Bell}
            title="You're all caught up"
            description="New updates about your applications and bookings will appear here."
          />
        ) : (
          <div className="space-y-2">
            {notifications.map((note) => (
              <button
                key={note.id}
                type="button"
                onClick={() => !note.read && markNotificationRead(note.id)}
                className={cn(
                  "flex w-full items-start justify-between gap-4 rounded-xl border p-4 text-left",
                  note.read
                    ? "border-primary/10 bg-white"
                    : "border-primary/20 bg-primary/5"
                )}
              >
                <div>
                  <p className="text-sm text-ink/80">{note.message}</p>
                  <p className="mt-1 text-xs text-ink/40">{formatDate(note.createdAt)}</p>
                </div>
                {!note.read && (
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
