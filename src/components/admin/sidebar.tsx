"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileStack,
  LayoutDashboard,
  LogOut,
  MapPinned,
  Menu,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { useSidebarState } from "@/lib/use-sidebar-state";
import { BrandMark } from "@/components/layout/brand-mark";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/applications", label: "Applications", icon: FileStack },
  { href: "/admin/documents", label: "Documents", icon: FileStack },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarDays },
  { href: "/admin/tours", label: "Tour Packages", icon: MapPinned },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const { mobileOpen, setMobileOpen, collapsed, setCollapsed } = useSidebarState();

  return (
    <>
      <div className="flex items-center justify-between border-b border-primary/10 bg-primary-dark px-4 py-3 text-white lg:hidden">
        <Link href="/admin/dashboard" className="flex items-center">
          <BrandMark size={36} onDark />
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-primary-dark text-white transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:shrink-0 lg:translate-x-0 lg:transition-[width]",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          collapsed ? "lg:w-20" : "lg:w-64"
        )}
      >
        <div className="flex items-center justify-between gap-3 px-6 py-6">
          <div className="flex items-center gap-3 overflow-hidden">
            <BrandMark size={40} onDark className="shrink-0" />
            <p
              className={cn(
                "flex items-center gap-1.5 whitespace-nowrap text-xs text-white/50",
                collapsed && "lg:hidden"
              )}
            >
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
              Staff Admin
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg hover:bg-white/10 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3 pb-6 lg:overflow-y-auto">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? link.label : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <link.icon className="h-4 w-4 shrink-0" />
                <span className={cn("whitespace-nowrap", collapsed && "lg:hidden")}>
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="hidden items-center gap-3 border-t border-white/10 px-6 py-3 text-xs font-medium text-white/50 hover:text-white lg:flex"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          <span className={cn(collapsed && "lg:hidden")}>Collapse</span>
        </button>

        <div className="border-t border-white/10 px-6 py-5">
          <Link
            href="/portal/dashboard"
            title={collapsed ? "Back to Client Portal" : undefined}
            className={cn("text-xs text-white/50 hover:text-white", collapsed && "lg:hidden")}
          >
            ← Back to Client Portal
          </Link>
          <p className={cn("mt-3 truncate text-xs text-white/50", collapsed && "lg:hidden")}>
            {user?.email ?? "Not signed in"}
          </p>
          <button
            type="button"
            onClick={() => logout()}
            title={collapsed ? "Sign Out" : undefined}
            className="mt-2 flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span className={cn(collapsed && "lg:hidden")}>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
