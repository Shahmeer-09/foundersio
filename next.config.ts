import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript:{
  ignoreBuildErrors:true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows any domain
      },
    ],
  },
  experimental: {
    ppr: 'incremental',
    after:true
  },
  devIndicators: {
    appIsrStatus: true, // defaults to true
    buildActivity: true, // defaults to true
    buildActivityPosition: "bottom-right",
  },
};

export default nextConfig;
