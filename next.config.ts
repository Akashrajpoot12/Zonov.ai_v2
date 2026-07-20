import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Allow higher-quality optimized images (Next 16 requires an allowlist).
    qualities: [75, 90, 95],
  },
};

export default nextConfig;
