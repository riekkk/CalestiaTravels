"use client";

import { ArrowDown, ArrowUp, ImageOff, Plus, Star, X } from "lucide-react";
import { Input } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";

// Firebase Storage is on hold (Blaze plan not active yet). Instead of a
// real file-upload widget, admins paste photo URLs (their own hosting, or
// a free image host) — PlaceholderImage already handles a broken/missing
// URL by falling back to the gradient, so this is safe to ship today.
// TODO: once Storage is enabled, replace this with a real drag-drop
// FileUpload (see src/components/portal/file-upload.tsx for the pattern)
// that uploads to Storage and pushes the resulting download URL in here.
export function PhotoUrlEditor({
  photos,
  coverPhotoIndex,
  onChange,
  onCoverChange,
}: {
  photos: string[];
  coverPhotoIndex: number;
  onChange: (next: string[]) => void;
  onCoverChange: (index: number) => void;
}) {
  function updatePhoto(index: number, value: string) {
    const next = [...photos];
    next[index] = value;
    onChange(next);
  }

  function removePhoto(index: number) {
    const next = photos.filter((_, i) => i !== index);
    onChange(next);
    if (coverPhotoIndex >= next.length) onCoverChange(Math.max(0, next.length - 1));
    else if (index < coverPhotoIndex) onCoverChange(coverPhotoIndex - 1);
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= photos.length) return;
    const next = [...photos];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
    if (coverPhotoIndex === index) onCoverChange(target);
    else if (coverPhotoIndex === target) onCoverChange(index);
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-primary-dark">Photos</p>
        <span className="flex items-center gap-1 text-xs text-amber-700">
          <ImageOff className="h-3.5 w-3.5" /> File upload coming soon — paste image URLs for now
        </span>
      </div>
      <div className="space-y-2">
        {photos.map((url, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center gap-2 rounded-xl border p-2",
              index === coverPhotoIndex ? "border-primary/40 bg-primary/5" : "border-primary/10"
            )}
          >
            <button
              type="button"
              onClick={() => onCoverChange(index)}
              title={index === coverPhotoIndex ? "Cover photo" : "Set as cover photo"}
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                index === coverPhotoIndex ? "text-amber-500" : "text-ink/30 hover:text-amber-500"
              )}
            >
              <Star className={cn("h-4 w-4", index === coverPhotoIndex && "fill-amber-400")} />
            </button>
            <Input
              value={url}
              onChange={(e) => updatePhoto(index, e.target.value)}
              placeholder="https://... or /images/tours/your-slug/photo.jpg"
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => move(index, -1)}
              disabled={index === 0}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink/40 hover:bg-primary/5 disabled:opacity-30"
              aria-label="Move up"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => move(index, 1)}
              disabled={index === photos.length - 1}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink/40 hover:bg-primary/5 disabled:opacity-30"
              aria-label="Move down"
            >
              <ArrowDown className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => removePhoto(index)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink/40 hover:bg-red-50 hover:text-red-600"
              aria-label="Remove photo"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...photos, ""])}
        className="mt-2 flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-dark"
      >
        <Plus className="h-3.5 w-3.5" /> Add Photo URL
      </button>
    </div>
  );
}
