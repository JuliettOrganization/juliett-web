import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  images: {
    domains: ["localhost"],
  },
  /* other config options here */
};

export default nextConfig;
