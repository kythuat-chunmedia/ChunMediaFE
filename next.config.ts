// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {

  
//   /* config options here */
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ["@svgr/webpack"],
//     });
//     return config;
//   },

//   turbopack: {
//     rules: {
//       '*.svg': {
//         loaders: ['@svgr/webpack'],
//         as: '*.js',
//       },
//     },
//   },
  
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '**',
//       },
//     ],
//   },
// };

// export default nextConfig;








import type { NextConfig } from "next";

// ★ MỚI: URL backend để rewrite /upload/* sang
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://be.chunmedia.vn";

const nextConfig: NextConfig = {

  
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // ★ MỚI: Cache ảnh optimized 30 ngày
    minimumCacheTTL: 2592000,
  },

  // ★ MỚI: Proxy /upload/* sang Backend
  // FE code giữ nguyên src="/upload/..." — Vercel tự forward sang backend
  async rewrites() {
    return [
      {
        source: "/upload/:path*",
        destination: `${API_URL}/upload/:path*`,
      },
    ];
  },
};

export default nextConfig;