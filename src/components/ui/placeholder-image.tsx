import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const gradients = [
  "from-primary/90 via-primary-dark to-primary/70",
  "from-primary-dark via-primary to-primary-dark/80",
  "from-primary/80 via-primary-dark/90 to-primary",
];

function hashLabel(label: string) {
  let hash = 0;
  for (let i = 0; i < label.length; i++) hash = (hash + label.charCodeAt(i) * (i + 1)) % gradients.length;
  return hash;
}

export function PlaceholderImage({
  label,
  className,
  fill = false,
}: {
  label: string;
  className?: string;
  fill?: boolean;
}) {
  const gradient = gradients[hashLabel(label)];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br text-white",
        gradient,
        fill ? "absolute inset-0" : "aspect-4/3 w-full",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 0, transparent 40%), radial-gradient(circle at 80% 80%, white 0, transparent 35%)",
        }}
      />
      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <ImageIcon className="h-6 w-6 opacity-70" strokeWidth={1.5} />
        <span className="font-heading text-sm font-medium tracking-wide opacity-90 sm:text-base">
          {label}
        </span>
      </div>
    </div>
  );
}
