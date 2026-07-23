"use client";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export const isRecaptchaConfigured = Boolean(SITE_KEY);

let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA."));
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export async function getRecaptchaToken(action: string): Promise<string> {
  if (!SITE_KEY) throw new Error("reCAPTCHA isn't configured yet.");
  await loadScript();
  return new Promise((resolve, reject) => {
    window.grecaptcha!.ready(() => {
      window
        .grecaptcha!.execute(SITE_KEY, { action })
        .then(resolve)
        .catch(reject);
    });
  });
}
