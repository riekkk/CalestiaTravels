"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/form-fields";
import { isFirebaseConfigured } from "@/lib/firebase";
import { submitReview } from "@/lib/firestore";
import { getRecaptchaToken, isRecaptchaConfigured } from "@/lib/recaptcha";
import { cn } from "@/lib/utils";

export function ReviewForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      if (!isFirebaseConfigured) {
        throw new Error(
          "Online review submission isn't connected yet. Please reach us by phone or email in the meantime."
        );
      }
      if (!isRecaptchaConfigured) {
        throw new Error(
          "Spam protection isn't configured yet. Please reach us by phone or email in the meantime."
        );
      }
      const name = String(data.get("name") ?? "");
      const quote = String(data.get("quote") ?? "");

      const recaptchaToken = await getRecaptchaToken("review_form");
      await submitReview({ name, rating, quote }, recaptchaToken);

      setStatus("success");
      form.reset();
      setRating(5);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-primary/10 bg-bg-light p-8 text-center">
        <p className="font-heading text-lg font-semibold text-primary-dark">
          Thank you for your review!
        </p>
        <p className="mt-2 text-sm text-ink/65">
          We appreciate you taking the time to share your experience.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label htmlFor="review-name">Name</Label>
        <Input id="review-name" name="name" required placeholder="Juan Dela Cruz" maxLength={100} />
      </div>
      <div>
        <Label htmlFor="review-rating">Rating</Label>
        <div id="review-rating" className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={`${value} star${value === 1 ? "" : "s"}`}
              className="p-0.5"
            >
              <Star
                className={cn(
                  "h-6 w-6 transition-colors",
                  value <= (hoverRating || rating)
                    ? "fill-primary text-primary"
                    : "text-primary/20"
                )}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="review-quote">Your Review</Label>
        <Textarea
          id="review-quote"
          name="quote"
          required
          rows={4}
          maxLength={1000}
          placeholder="Tell us about your experience with Calestia..."
        />
      </div>
      {status === "error" && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        Submit Review
      </Button>
      <p className="text-xs text-ink/40">
        This site is protected by reCAPTCHA and the Google{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Terms of Service
        </a>{" "}
        apply.
      </p>
    </form>
  );
}
