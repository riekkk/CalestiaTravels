import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandMark({
  size = 40,
  onDark = false,
  className,
}: {
  size?: number;
  onDark?: boolean;
  className?: string;
}) {
  const image = (
    <Image
      src="/images/logo.png"
      alt="Calestia Travel & Tours"
      width={size}
      height={size}
      className="rounded-lg"
      preload
    />
  );

  if (!onDark) return <div className={className}>{image}</div>;

  return (
    <span className={cn("inline-flex items-center justify-center rounded-xl bg-bg-light p-1", className)}>
      {image}
    </span>
  );
}
