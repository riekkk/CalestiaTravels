"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { PortalSidebar } from "@/components/portal/sidebar";

export default function PortalAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isFirebaseConfigured } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    if (!loading && !user) {
      router.replace("/portal/login");
    }
  }, [loading, user, isFirebaseConfigured, router]);

  if (isFirebaseConfigured && loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-light">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (isFirebaseConfigured && !user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg-light lg:flex-row">
      <PortalSidebar />
      <main className="flex-1">
        {!isFirebaseConfigured && (
          <div className="flex items-center gap-3 bg-amber-50 px-6 py-3 text-sm text-amber-800">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            Firebase isn&apos;t connected yet — you&apos;re viewing the portal
            with sample/empty data. Add your Firebase config to{" "}
            <code className="rounded bg-amber-100 px-1.5 py-0.5">.env.local</code>{" "}
            to enable real accounts.
          </div>
        )}
        <div className="container-page py-10">{children}</div>
      </main>
    </div>
  );
}
