import "server-only";
import { createRemoteJWKSet, jwtVerify } from "jose";

// firebase-admin/auth's verifyIdToken() pulls in jwks-rsa -> jose (ESM),
// which Vercel's serverless bundler fails to require() at runtime (see the
// comment in firebase-admin.ts). Verifying the ID token manually with jose
// directly — a plain ESM import, not routed through jwks-rsa's broken
// require() path — does the exact same job (fetch Google's public keys,
// check the RS256 signature and standard claims) without touching the
// broken dependency chain at all.
const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;

const JWKS = createRemoteJWKSet(
  new URL(
    "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"
  )
);

export async function verifyFirebaseIdToken(token: string): Promise<{ uid: string } | null> {
  if (!projectId) return null;
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://securetoken.google.com/${projectId}`,
      audience: projectId,
    });
    if (typeof payload.sub !== "string" || !payload.sub) return null;
    return { uid: payload.sub };
  } catch {
    return null;
  }
}
