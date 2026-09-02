import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sekrafdanbpn.my.id",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
