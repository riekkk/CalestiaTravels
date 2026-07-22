import type { GalleryImage } from "@/lib/types";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Reveal } from "@/components/ui/reveal";

const spanPattern = [
  "row-span-2",
  "row-span-1",
  "row-span-1",
  "row-span-2",
  "row-span-1",
  "row-span-1",
];

export function Gallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[160px] sm:grid-cols-3 lg:grid-cols-4">
      {images.map((image, index) => (
        <Reveal
          key={image.slug}
          delay={(index % 8) * 40}
          className={`relative ${spanPattern[index % spanPattern.length]}`}
        >
          <PlaceholderImage
            label={image.label}
            fill
            className="h-full rounded-xl transition-transform duration-500 hover:scale-[1.03]"
          />
        </Reveal>
      ))}
    </div>
  );
}
