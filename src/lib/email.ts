import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const NOTIFY_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_NOTIFY_TEMPLATE_ID;
const CONFIRM_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CONFIRM_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export const isEmailConfigured = Boolean(
  SERVICE_ID && NOTIFY_TEMPLATE_ID && CONFIRM_TEMPLATE_ID && PUBLIC_KEY
);

let initialized = false;
function ensureInitialized() {
  if (initialized || !PUBLIC_KEY) return;
  emailjs.init({ publicKey: PUBLIC_KEY });
  initialized = true;
}

export type FormEmailParams = {
  formType: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  details: string;
  nextSteps: string;
};

/**
 * Fires the "Notify Calestia" and "Confirm to Client" EmailJS templates for
 * a form submission. Runs client-side only (no Cloud Functions / Blaze plan
 * required). Failures here are non-fatal to the caller's own data write —
 * callers should catch and swallow/report separately so a flaky email
 * provider never blocks the underlying Firestore submission.
 */
export async function sendFormEmails(params: FormEmailParams) {
  if (!isEmailConfigured) return;
  ensureInitialized();

  const templateParams = {
    form_type: params.formType,
    client_name: params.clientName,
    client_email: params.clientEmail,
    client_phone: params.clientPhone,
    details: params.details,
    next_steps: params.nextSteps,
  };

  await Promise.all([
    emailjs.send(SERVICE_ID as string, NOTIFY_TEMPLATE_ID as string, templateParams),
    emailjs.send(SERVICE_ID as string, CONFIRM_TEMPLATE_ID as string, templateParams),
  ]);
}
