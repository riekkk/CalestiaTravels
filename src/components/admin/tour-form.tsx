"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import type { TourPackage } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/form-fields";
import { StringListEditor } from "@/components/admin/string-list-editor";
import { PhotoUrlEditor } from "@/components/admin/photo-url-editor";
import { ItineraryEditor } from "@/components/admin/itinerary-editor";
import { DateRangeEditor } from "@/components/admin/date-range-editor";
import { FaqEditor } from "@/components/admin/faq-editor";

export type TourFormData = Omit<TourPackage, "id" | "createdAt" | "updatedAt">;

const emptyForm: TourFormData = {
  slug: "",
  publishStatus: "Draft",
  category: "domestic",
  title: "",
  destinationLabel: "",
  tagline: "",
  overview: "",
  highlights: [],
  inclusions: [],
  exclusions: [],
  pricing: {},
  durationDays: 1,
  durationNights: 0,
  maxGroupSize: 0,
  departure: "Manila",
  photos: [],
  coverPhotoIndex: 0,
  itinerary: [],
  availabilityStatus: "Available",
  remainingSlots: undefined,
  dateRanges: [],
  faqs: [],
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function TourForm({
  initialData,
  onSubmit,
  submitLabel = "Save Package",
}: {
  initialData?: TourFormData;
  onSubmit: (data: TourFormData) => Promise<void>;
  submitLabel?: string;
}) {
  const [form, setForm] = useState<TourFormData>(initialData ?? emptyForm);
  const [slugTouched, setSlugTouched] = useState(Boolean(initialData));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function patch(update: Partial<TourFormData>) {
    setForm((prev) => ({ ...prev, ...update }));
  }

  function handleTitleChange(title: string) {
    patch({ title, ...(slugTouched ? {} : { slug: slugify(title) }) });
  }

  async function handleSubmit() {
    setError("");
    if (!form.title.trim() || !form.slug.trim() || !form.destinationLabel.trim()) {
      setError("Package name, slug, and destination are required.");
      return;
    }
    setSaving(true);
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save package.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-primary/10 bg-white p-6">
        <h2 className="mb-4 font-heading text-lg font-semibold text-primary-dark">Basic Info</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="title">Package Name</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Dumaguete & Siquijor Getaway"
            />
          </div>
          <div>
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                patch({ slug: slugify(e.target.value) });
              }}
              placeholder="dumaguete-siquijor"
            />
          </div>
          <div>
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              value={form.destinationLabel}
              onChange={(e) => patch({ destinationLabel: e.target.value })}
              placeholder="Dumaguete & Siquijor"
            />
          </div>
          <div>
            <Label htmlFor="departure">Departure From</Label>
            <Input
              id="departure"
              value={form.departure}
              onChange={(e) => patch({ departure: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="category">Type</Label>
            <Select
              id="category"
              value={form.category}
              onChange={(e) => patch({ category: e.target.value as TourFormData["category"] })}
            >
              <option value="domestic">Domestic</option>
              <option value="international">International</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="publishStatus">Availability Status</Label>
            <Select
              id="publishStatus"
              value={form.publishStatus}
              onChange={(e) =>
                patch({ publishStatus: e.target.value as TourFormData["publishStatus"] })
              }
            >
              <option value="Active">Active — visible on the site</option>
              <option value="Draft">Draft — hidden</option>
              <option value="Archived">Archived — hidden</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="durationDays">Duration (Days)</Label>
            <Input
              id="durationDays"
              type="number"
              min={0}
              value={form.durationDays}
              onChange={(e) => patch({ durationDays: Number(e.target.value) })}
            />
          </div>
          <div>
            <Label htmlFor="durationNights">Duration (Nights)</Label>
            <Input
              id="durationNights"
              type="number"
              min={0}
              value={form.durationNights}
              onChange={(e) => patch({ durationNights: Number(e.target.value) })}
            />
          </div>
          <div>
            <Label htmlFor="maxGroupSize">Max Group Size</Label>
            <Input
              id="maxGroupSize"
              type="number"
              min={0}
              value={form.maxGroupSize}
              onChange={(e) => patch({ maxGroupSize: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            value={form.tagline}
            onChange={(e) => patch({ tagline: e.target.value })}
            placeholder="A short one-line hook shown on cards and the hero."
          />
        </div>
        <div className="mt-4">
          <Label htmlFor="overview">Description</Label>
          <Textarea
            id="overview"
            rows={4}
            value={form.overview}
            onChange={(e) => patch({ overview: e.target.value })}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-primary/10 bg-white p-6">
        <h2 className="mb-4 font-heading text-lg font-semibold text-primary-dark">
          Pricing Tiers (₱ per person)
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="price-budget">Budget</Label>
            <Input
              id="price-budget"
              type="number"
              min={0}
              value={form.pricing.budget ?? ""}
              onChange={(e) =>
                patch({
                  pricing: {
                    ...form.pricing,
                    budget: e.target.value === "" ? undefined : Number(e.target.value),
                  },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="price-standard">Standard</Label>
            <Input
              id="price-standard"
              type="number"
              min={0}
              value={form.pricing.standard ?? ""}
              onChange={(e) =>
                patch({
                  pricing: {
                    ...form.pricing,
                    standard: e.target.value === "" ? undefined : Number(e.target.value),
                  },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="price-luxury">Luxury</Label>
            <Input
              id="price-luxury"
              type="number"
              min={0}
              value={form.pricing.luxury ?? ""}
              onChange={(e) =>
                patch({
                  pricing: {
                    ...form.pricing,
                    luxury: e.target.value === "" ? undefined : Number(e.target.value),
                  },
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-primary/10 bg-white p-6">
        <h2 className="mb-4 font-heading text-lg font-semibold text-primary-dark">
          Availability
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="availabilityStatus">Slots Status</Label>
            <Select
              id="availabilityStatus"
              value={form.availabilityStatus}
              onChange={(e) =>
                patch({ availabilityStatus: e.target.value as TourFormData["availabilityStatus"] })
              }
            >
              <option value="Available">Available</option>
              <option value="Limited Slots">Limited Slots</option>
              <option value="Sold Out">Sold Out</option>
            </Select>
          </div>
          {form.availabilityStatus === "Limited Slots" && (
            <div>
              <Label htmlFor="remainingSlots">Remaining Slots</Label>
              <Input
                id="remainingSlots"
                type="number"
                min={0}
                value={form.remainingSlots ?? ""}
                onChange={(e) =>
                  patch({ remainingSlots: e.target.value === "" ? undefined : Number(e.target.value) })
                }
              />
            </div>
          )}
        </div>
        <div className="mt-4">
          <DateRangeEditor
            ranges={form.dateRanges}
            onChange={(dateRanges) => patch({ dateRanges })}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-primary/10 bg-white p-6 space-y-6">
        <h2 className="font-heading text-lg font-semibold text-primary-dark">
          Highlights, Inclusions & Exclusions
        </h2>
        <StringListEditor
          label="Highlights"
          items={form.highlights}
          onChange={(highlights) => patch({ highlights })}
        />
        <StringListEditor
          label="Inclusions"
          items={form.inclusions}
          onChange={(inclusions) => patch({ inclusions })}
        />
        <StringListEditor
          label="Exclusions"
          items={form.exclusions}
          onChange={(exclusions) => patch({ exclusions })}
        />
      </div>

      <div className="rounded-2xl border border-primary/10 bg-white p-6">
        <h2 className="mb-4 font-heading text-lg font-semibold text-primary-dark">
          Photos
        </h2>
        <PhotoUrlEditor
          photos={form.photos}
          coverPhotoIndex={form.coverPhotoIndex}
          onChange={(photos) => patch({ photos })}
          onCoverChange={(coverPhotoIndex) => patch({ coverPhotoIndex })}
        />
      </div>

      <div>
        <h2 className="mb-4 font-heading text-lg font-semibold text-primary-dark">
          Itinerary
        </h2>
        <ItineraryEditor days={form.itinerary} onChange={(itinerary) => patch({ itinerary })} />
      </div>

      <div className="rounded-2xl border border-primary/10 bg-white p-6">
        <h2 className="mb-4 font-heading text-lg font-semibold text-primary-dark">FAQs</h2>
        <FaqEditor faqs={form.faqs} onChange={(faqs) => patch({ faqs })} />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button onClick={handleSubmit} disabled={saving} size="lg">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {submitLabel}
      </Button>
    </div>
  );
}
