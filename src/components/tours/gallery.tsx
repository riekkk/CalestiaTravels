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

export function Gallery({
  photos,
  destinationLabel,
}: {
  photos: string[];
  destinationLabel: string;
}) {
  if (photos.length === 0) {
    return (
      <p className="text-sm text-ink/50">Photos for this destination are coming soon.</p>
    );
  }

  return (
    <div className="grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[160px] sm:grid-cols-3 lg:grid-cols-4">
      {photos.map((src, index) => (
        <Reveal
          key={src}
          delay={(index % 8) * 40}
          className={`relative ${spanPattern[index % spanPattern.length]}`}
        >
          <PlaceholderImage
            label={`${destinationLabel} ${index + 1}`}
            src={src}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="h-full rounded-xl transition-transform duration-500 hover:scale-[1.03]"
          />
        </Reveal>
      ))}
    </div>
  );
}
