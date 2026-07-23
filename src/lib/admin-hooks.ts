"use client";

import { useEffect, useState } from "react";
import { isFirebaseConfigured } from "@/lib/firebase";
import {
  subscribeToAllApplications,
  subscribeToAllBookings,
  subscribeToAllDocuments,
  subscribeToAllPayments,
  subscribeToAllTourPackages,
  subscribeToAllUsers,
} from "@/lib/firestore";
import type {
  Booking,
  ClientDocument,
  ClientProfile,
  Payment,
  TourPackage,
  VisaApplication,
} from "@/lib/types";

export function useAllApplications(enabled: boolean) {
  const [applications, setApplications] = useState<VisaApplication[]>([]);
  const [loading, setLoading] = useState(enabled && isFirebaseConfigured);

  useEffect(() => {
    if (!enabled || !isFirebaseConfigured) return;
    const unsubscribe = subscribeToAllApplications((data) => {
      setApplications(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [enabled]);

  return { applications, loading };
}

export function useAllDocuments(enabled: boolean) {
  const [documents, setDocuments] = useState<ClientDocument[]>([]);
  const [loading, setLoading] = useState(enabled && isFirebaseConfigured);

  useEffect(() => {
    if (!enabled || !isFirebaseConfigured) return;
    const unsubscribe = subscribeToAllDocuments((data) => {
      setDocuments(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [enabled]);

  return { documents, loading };
}

export function useAllBookings(enabled: boolean) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(enabled && isFirebaseConfigured);

  useEffect(() => {
    if (!enabled || !isFirebaseConfigured) return;
    const unsubscribe = subscribeToAllBookings((data) => {
      setBookings(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [enabled]);

  return { bookings, loading };
}

export function useAllPayments(enabled: boolean) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(enabled && isFirebaseConfigured);

  useEffect(() => {
    if (!enabled || !isFirebaseConfigured) return;
    const unsubscribe = subscribeToAllPayments((data) => {
      setPayments(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [enabled]);

  return { payments, loading };
}

export function useAllUsers(enabled: boolean) {
  const [users, setUsers] = useState<ClientProfile[]>([]);
  const [loading, setLoading] = useState(enabled && isFirebaseConfigured);

  useEffect(() => {
    if (!enabled || !isFirebaseConfigured) return;
    const unsubscribe = subscribeToAllUsers((data) => {
      setUsers(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [enabled]);

  return { users, loading };
}

export function useAllTourPackages(enabled: boolean) {
  const [tours, setTours] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(enabled && isFirebaseConfigured);

  useEffect(() => {
    if (!enabled || !isFirebaseConfigured) return;
    const unsubscribe = subscribeToAllTourPackages((data) => {
      setTours(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [enabled]);

  return { tours, loading };
}
