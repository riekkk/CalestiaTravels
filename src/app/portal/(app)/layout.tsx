import type { Metadata } from "next";
import { PortalAppLayoutClient } from "@/components/portal/portal-app-layout-client";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PortalAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortalAppLayoutClient>{children}</PortalAppLayoutClient>;
}
