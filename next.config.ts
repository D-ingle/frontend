import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3845",
      },
      {
        protocol: "https",
        hostname: "d-home.o-r.kr",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
