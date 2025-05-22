import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    esmExternals: 'loose', // Allow Next.js to handle ESM externals more flexibly
  },
};

export default nextConfig;
