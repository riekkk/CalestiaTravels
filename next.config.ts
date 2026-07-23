import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // firebase-admin/auth pulls in jwks-rsa -> jose, which the serverless
  // bundler fails to load (require() of an ES module) if it tries to bundle
  // it. Marking firebase-admin external makes Node resolve it natively at
  // runtime instead, which handles the CJS/ESM interop correctly.
  serverExternalPackages: ["firebase-admin"],
};

export default nextConfig;
