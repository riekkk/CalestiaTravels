import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-primary/10 bg-white shadow-[0_2px_20px_-8px_rgba(40,64,94,0.15)] transition-all duration-300",
        className
      )}
      {...props}
    />
  );
}
