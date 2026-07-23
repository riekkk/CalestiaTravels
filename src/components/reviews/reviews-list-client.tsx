"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { ReviewForm } from "@/components/forms/review-form";
import { isFirebaseConfigured } from "@/lib/firebase";
import { subscribeToReviews } from "@/lib/firestore";
import type { Review } from "@/lib/types";

export function ReviewsListClient() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const unsubscribe = subscribeToReviews(setReviews);
    return () => unsubscribe();
  }, []);

  const average =
    reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  return (
    <>
      {reviews.length > 0 && (
        <div className="mx-auto mb-12 flex max-w-xs items-center justify-center gap-3 rounded-2xl border border-primary/10 bg-white px-6 py-4 text-center">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={
                  i < Math.round(average)
                    ? "h-4 w-4 fill-primary text-primary"
                    : "h-4 w-4 text-primary/20"
                }
              />
            ))}
          </div>
          <span className="text-sm font-medium text-ink/70">
            {average.toFixed(1)} average rating &middot; {reviews.length} review
            {reviews.length === 1 ? "" : "s"}
          </span>
        </div>
      )}

      {reviews.length > 0 ? (
        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal key={review.id} delay={index * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-primary/10 bg-white p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/75">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="mt-6 border-t border-primary/10 pt-4">
                  <p className="text-sm font-semibold text-primary-dark">{review.name}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="mb-16 text-center text-sm text-ink/55">
          No reviews yet. Be the first to share your experience below.
        </p>
      )}

      <div className="mx-auto max-w-xl">
        <h2 className="mb-4 text-center font-heading text-xl font-semibold text-primary-dark">
          Leave a Review
        </h2>
        <div className="rounded-3xl border border-primary/10 bg-white p-6 sm:p-8">
          <ReviewForm />
        </div>
      </div>
    </>
  );
}
