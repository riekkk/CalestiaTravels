"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, profileLoading, isAdmin, isFirebaseConfigured } = useAuth();
  const router = useRouter();

  const resolving = loading || (Boolean(user) && profileLoading);

  useEffect(() => {
    if (!isFirebaseConfigured || resolving) return;
    if (!user) {
      router.replace("/portal/login");
      return;
    }
    if (!isAdmin) {
      router.replace("/portal/dashboard");
    }
  }, [resolving, user, isAdmin, isFirebaseConfigured, router]);

  if (!isFirebaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-light px-6 text-center">
        <p className="max-w-sm text-sm text-ink/60">
          Firebase isn&apos;t connected yet, so the admin console isn&apos;t
          available. Add your Firebase config to <code>.env.local</code> first.
        </p>
      </div>
    );
  }

  if (resolving || !user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-light">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg-light lg:flex-row">
      <AdminSidebar />
      <main className="flex-1">
        <div className="container-page py-10">{children}</div>
      </main>
    </div>
  );
}
