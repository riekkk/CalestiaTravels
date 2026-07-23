"use client";

import { useEffect, useState } from "react";
import { isFirebaseConfigured } from "@/lib/firebase";
import {
  subscribeToApplications,
  subscribeToBookings,
  subscribeToDocuments,
  subscribeToFormsChecklist,
  subscribeToNotifications,
  subscribeToPayments,
} from "@/lib/firestore";
import type {
  Booking,
  ClientDocument,
  ClientNotification,
  Payment,
  VisaApplication,
} from "@/lib/types";

export function useApplications(userId: string | undefined) {
  const [applications, setApplications] = useState<VisaApplication[]>([]);
  const [loading, setLoading] = useState(Boolean(userId) && isFirebaseConfigured);

  useEffect(() => {
    if (!userId || !isFirebaseConfigured) return;
    const unsubscribe = subscribeToApplications(userId, (data) => {
      setApplications(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [userId]);

  return { applications, loading };
}

export function useDocuments(userId: string | undefined) {
  const [documents, setDocuments] = useState<ClientDocument[]>([]);
  const [loading, setLoading] = useState(Boolean(userId) && isFirebaseConfigured);

  useEffect(() => {
    if (!userId || !isFirebaseConfigured) return;
    const unsubscribe = subscribeToDocuments(userId, (data) => {
      setDocuments(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [userId]);

  return { documents, loading };
}

export function useFormsChecklist(userId: string | undefined) {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(Boolean(userId) && isFirebaseConfigured);

  useEffect(() => {
    if (!userId || !isFirebaseConfigured) return;
    const unsubscribe = subscribeToFormsChecklist(userId, (data) => {
      setChecklist(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [userId]);

  return { checklist, loading };
}

export function useBookings(userId: string | undefined) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(Boolean(userId) && isFirebaseConfigured);

  useEffect(() => {
    if (!userId || !isFirebaseConfigured) return;
    const unsubscribe = subscribeToBookings(userId, (data) => {
      setBookings(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [userId]);

  return { bookings, loading };
}

export function usePayments(userId: string | undefined) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(Boolean(userId) && isFirebaseConfigured);

  useEffect(() => {
    if (!userId || !isFirebaseConfigured) return;
    const unsubscribe = subscribeToPayments(userId, (data) => {
      setPayments(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [userId]);

  return { payments, loading };
}

export function useNotifications(userId: string | undefined) {
  const [notifications, setNotifications] = useState<ClientNotification[]>([]);
  const [loading, setLoading] = useState(Boolean(userId) && isFirebaseConfigured);

  useEffect(() => {
    if (!userId || !isFirebaseConfigured) return;
    const unsubscribe = subscribeToNotifications(userId, (data) => {
      setNotifications(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [userId]);

  return { notifications, loading };
}
