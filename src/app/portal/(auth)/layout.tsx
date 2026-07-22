import Link from "next/link";
import { Plane } from "lucide-react";

export default function PortalAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary-dark px-4 py-16">
      <Link href="/" className="mb-8 flex items-center gap-2 text-white">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
          <Plane className="h-5 w-5" strokeWidth={2} />
        </span>
        <span className="font-heading text-xl font-semibold">Calestia</span>
      </Link>
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">{children}</div>
    </div>
  );
}
