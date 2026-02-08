import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config: { module: { rules: { test: RegExp; use: string[]; }[]; }; resolve: { fallback: any; }; }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
    };

    return config;
  },
   typescript: {
     ignoreBuildErrors: true,
   },
};

export default nextConfig;