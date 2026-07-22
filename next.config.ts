import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/* Content-Security-Policy.
   The site loads no third-party browser resources (fonts/images/scripts are all
   same-origin; the only external references are <a> links). 'unsafe-inline' is
   required for Next's hydration scripts and our inline styles / style attributes;
   tightening script-src to a nonce would need middleware and is a future step.
   Enforced in production only so dev HMR / Fast Refresh (which uses eval) works. */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  ...(isProd ? [{ key: "Content-Security-Policy", value: csp }] : []),
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false, // don't advertise the framework/version
  images: {
    // Allow higher-quality optimized images (Next 16 requires an allowlist).
    qualities: [75, 90, 95],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
