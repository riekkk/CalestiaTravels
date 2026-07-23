"use client";

import { useEffect, useState } from "react";
import { isFirebaseConfigured } from "@/lib/firebase";
import { subscribeToActiveTourPackages, subscribeToTourPackageBySlug } from "@/lib/firestore";
import type { TourPackage } from "@/lib/types";

export function useActiveTourPackages() {
  const [tours, setTours] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const unsubscribe = subscribeToActiveTourPackages((data) => {
      setTours(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { tours, loading };
}

export function useTourPackage(slug: string) {
  const [tour, setTour] = useState<TourPackage | null | undefined>(undefined);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const unsubscribe = subscribeToTourPackageBySlug(slug, setTour);
    return () => unsubscribe();
  }, [slug]);

  // undefined = still loading, null = confirmed not found
  return { tour, loading: tour === undefined };
}
