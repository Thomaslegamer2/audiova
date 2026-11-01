import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  devIndicators: false,
  allowedDevOrigins: ["127.0.0.1"],
  serverExternalPackages: ["youtube-dl-exec"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/ffmpeg/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://pagead2.googlesyndication.com https://www.googletagservices.com",
              "worker-src 'self' blob:",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://pagead2.googlesyndication.com https://*.googleusercontent.com",
              "media-src 'self' blob:",
              "font-src 'self' data:",
              "connect-src 'self' blob: https://pagead2.googlesyndication.com",
              "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
