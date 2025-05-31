import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow warnings in production build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Production-ready configuration
};

export default nextConfig;
