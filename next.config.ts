import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [
      new URL("https://lh3.googleusercontent.com/**"),
      {
        protocol: "https",
        hostname: "pub-9cdf424a2c454f8db7fa1712ca9d6b43.r2.dev",
      },
    ],
  },
};

export default nextConfig;
