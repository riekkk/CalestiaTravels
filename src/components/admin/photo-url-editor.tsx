"use client";

import { useRef, useState } from "react";
import { ArrowDown, ArrowUp, ImageOff, Loader2, Plus, Star, Upload, X } from "lucide-react";
import { Input } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { uploadFile } from "@/lib/upload";
import { isUploadConfigured } from "@/lib/upload-config";

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
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleFileSelect(file: File | undefined) {
    if (!file || !user) return;
    setUploadError("");
    setUploading(true);
    try {
      const { url } = await uploadFile(user, file, "tour-photo");
      onChange([...photos, url]);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

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
        {!isUploadConfigured && (
          <span className="flex items-center gap-1 text-xs text-amber-700">
            <ImageOff className="h-3.5 w-3.5" /> File upload not connected, paste image URLs for now
          </span>
        )}
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
      <div className="mt-2 flex flex-wrap items-center gap-4">
        {isUploadConfigured && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-dark disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Upload className="h-3.5 w-3.5" />
            )}
            {uploading ? "Uploading..." : "Upload Photo"}
          </button>
        )}
        <button
          type="button"
          onClick={() => onChange([...photos, ""])}
          className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-dark"
        >
          <Plus className="h-3.5 w-3.5" /> Add Photo URL
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => handleFileSelect(e.target.files?.[0])}
      />
      {uploadError && <p className="mt-2 text-xs text-red-600">{uploadError}</p>}
    </div>
  );
}
