"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  CalendarDays,
  FileStack,
  LayoutDashboard,
  LogOut,
  Plane,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

const links = [
  { href: "/portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/applications", label: "Applications", icon: FileStack },
  { href: "/portal/documents", label: "Documents", icon: FileStack },
  { href: "/portal/bookings", label: "Bookings", icon: CalendarDays },
  { href: "/portal/notifications", label: "Notifications", icon: Bell },
  { href: "/portal/profile", label: "Profile", icon: User },
];

export function PortalSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-primary/10 bg-primary-dark text-white lg:h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <div className="flex items-center gap-2 px-6 py-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
          <Plane className="h-4 w-4" strokeWidth={2} />
        </span>
        <div>
          <p className="font-heading text-base font-semibold">Calestia</p>
          <p className="text-xs text-white/50">Client Portal</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 pb-6 lg:overflow-y-auto">
        {links.map((link) => {
          const active = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-6 py-5">
        <p className="truncate text-xs text-white/50">{user?.email ?? "Not signed in"}</p>
        <button
          type="button"
          onClick={() => logout()}
          className="mt-3 flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
