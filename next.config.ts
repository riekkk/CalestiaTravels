import type { NextConfig } from "next";

// next/image refuses to serve any remote src whose host isn't allowlisted
// here — uploaded tour photos live in Supabase Storage, so without this every
// <Image> pointed at them fires onError and falls back to the placeholder.
const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  // firebase-admin/auth pulls in jwks-rsa -> jose, which the serverless
  // bundler fails to load (require() of an ES module) if it tries to bundle
  // it. Marking firebase-admin external makes Node resolve it natively at
  // runtime instead, which handles the CJS/ESM interop correctly.
  serverExternalPackages: ["firebase-admin"],
  images: {
    remotePatterns: supabaseHostname
      ? [
          {
            protocol: "https",
            hostname: supabaseHostname,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
