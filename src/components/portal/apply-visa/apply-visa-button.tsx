"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, type Variant, type Size } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { ApplyVisaModal } from "@/components/portal/apply-visa/apply-visa-modal";

export function ApplyVisaButton({
  variant = "primary",
  size = "md",
  className,
  children = "Apply Now",
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function handleClick() {
    if (!user) {
      router.push("/portal/login");
      return;
    }
    setOpen(true);
  }

  return (
    <>
      <Button type="button" variant={variant} size={size} className={className} onClick={handleClick}>
        {children}
      </Button>
      <ApplyVisaModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
