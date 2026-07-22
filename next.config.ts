import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      // Serve the self-contained bundled mobile/vertical site (a single static
      // HTML in public/mobile/) at the clean path /mobile.
      { source: "/mobile", destination: "/mobile/index.html" },
    ];
  },
};

export default nextConfig;
