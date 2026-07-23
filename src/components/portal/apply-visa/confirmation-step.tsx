"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ConfirmationStep({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  function goTo(href: string) {
    onClose();
    router.push(href);
  }

  return (
    <div className="text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <CheckCircle2 className="h-8 w-8" strokeWidth={1.75} />
      </span>
      <h2 className="mt-5 font-heading text-2xl font-semibold text-primary-dark">
        Application Submitted Successfully
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/65">
        Thank you for choosing Calestia Travel &amp; Tours. Your application
        has been received. Your payment has been verified. Our visa
        specialists will review your application shortly.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button onClick={() => goTo("/portal/applications")}>View My Application</Button>
        <Button variant="secondary" onClick={() => goTo("/portal/dashboard")}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
}
