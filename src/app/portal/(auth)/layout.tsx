import Link from "next/link";
import { BrandMark } from "@/components/layout/brand-mark";

export default function PortalAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary-dark px-4 py-16">
      <Link href="/" className="mb-8 inline-flex items-center">
        <BrandMark size={56} onDark />
      </Link>
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">{children}</div>
    </div>
  );
}
