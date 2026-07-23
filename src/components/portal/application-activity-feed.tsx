import { Bell } from "lucide-react";
import type { ClientNotification } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function ApplicationActivityFeed({
  notifications,
}: {
  notifications: ClientNotification[];
}) {
  if (notifications.length === 0) {
    return (
      <p className="text-sm text-ink/50">No activity yet for this application.</p>
    );
  }

  return (
    <ol className="space-y-4 border-l border-primary/10 pl-5">
      {notifications.map((note) => (
        <li key={note.id} className="relative">
          <span className="absolute -left-[1.45rem] flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Bell className="h-2.5 w-2.5" />
          </span>
          <p className="text-sm text-ink/75">{note.message}</p>
          <p className="mt-0.5 text-xs text-ink/40">{formatDate(note.createdAt)}</p>
        </li>
      ))}
    </ol>
  );
}
