"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase";
import { CURRENT_PRIVACY_VERSION, CURRENT_TERMS_VERSION } from "@/lib/legal";
import type { ClientProfile } from "@/lib/types";

type ConsentInput = {
  agreedToTerms: boolean;
  agreedToPrivacy: boolean;
};

type AuthContextValue = {
  user: User | null;
  profile: ClientProfile | null;
  isAdmin: boolean;
  loading: boolean;
  profileLoading: boolean;
  isFirebaseConfigured: boolean;
  register: (
    name: string,
    email: string,
    password: string,
    consent: ConsentInput
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const profileLoading = Boolean(user) && !profile;

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) return;
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      if (!firebaseUser) setProfile(null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigured || !db || !user) return;
    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (snapshot) => {
      const data = snapshot.data();
      if (!data) return;
      setProfile({
        uid: user.uid,
        name: data.name ?? "",
        email: data.email ?? "",
        phone: data.phone,
        address: data.address,
        isAdmin: data.isAdmin === true,
        agreedToTerms: data.agreedToTerms === true,
        agreedToPrivacy: data.agreedToPrivacy === true,
        termsVersion: data.termsVersion,
        privacyVersion: data.privacyVersion,
        agreedAt: data.agreedAt?.toMillis?.() ?? undefined,
        createdAt: data.createdAt?.toMillis?.() ?? Date.now(),
      });
    });
    return () => unsubscribe();
  }, [user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      isAdmin: profile?.isAdmin === true,
      loading,
      profileLoading,
      isFirebaseConfigured,
      async register(name, email, password, consent) {
        if (!auth || !db) throw new Error("Firebase is not configured yet.");
        if (!consent.agreedToTerms || !consent.agreedToPrivacy) {
          throw new Error("You must agree to the Terms of Service and Privacy Policy.");
        }
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(credential.user, { displayName: name });
        await setDoc(doc(db, "users", credential.user.uid), {
          uid: credential.user.uid,
          name,
          email,
          agreedToTerms: consent.agreedToTerms,
          agreedToPrivacy: consent.agreedToPrivacy,
          termsVersion: CURRENT_TERMS_VERSION,
          privacyVersion: CURRENT_PRIVACY_VERSION,
          agreedAt: serverTimestamp(),
          createdAt: serverTimestamp(),
        });
        await sendEmailVerification(credential.user);
      },
      async login(email, password) {
        if (!auth) throw new Error("Firebase is not configured yet.");
        await signInWithEmailAndPassword(auth, email, password);
      },
      async logout() {
        if (!auth) return;
        await firebaseSignOut(auth);
      },
      async resendVerificationEmail() {
        if (!auth?.currentUser) throw new Error("You need to be signed in to do that.");
        await sendEmailVerification(auth.currentUser);
      },
      async resetPassword(email) {
        if (!auth) throw new Error("Firebase is not configured yet.");
        await sendPasswordResetEmail(auth, email);
      },
      async refreshUser() {
        if (!auth?.currentUser) return;
        await auth.currentUser.reload();
        setUser(auth.currentUser ? { ...auth.currentUser } : null);
      },
    }),
    [user, profile, loading, profileLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
