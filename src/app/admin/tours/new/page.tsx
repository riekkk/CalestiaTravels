"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createTourPackage } from "@/lib/firestore";
import { TourForm, type TourFormData } from "@/components/admin/tour-form";

export default function NewTourPackagePage() {
  const router = useRouter();

  async function handleSubmit(data: TourFormData) {
    const id = await createTourPackage(data);
    router.push(`/admin/tours/${id}/edit`);
  }

  return (
    <div>
      <Link href="/admin/tours" className="flex items-center gap-2 text-sm text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to Tour Packages
      </Link>
      <h1 className="mt-6 font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
        New Tour Package
      </h1>
      <p className="mt-1 text-sm text-ink/55">
        New packages save as Draft by default — switch to Active when ready to publish.
      </p>
      <div className="mt-8">
        <TourForm onSubmit={handleSubmit} submitLabel="Create Package" />
      </div>
    </div>
  );
}
