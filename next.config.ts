import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dupontmetatank.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // 允許本地圖片帶 query string（用於版本化快取破壞，例如 /layer.png?v=N）
    localPatterns: [{ pathname: "/**" }],
  },
};

export default nextConfig;
