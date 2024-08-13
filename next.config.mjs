/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/detail",
        destination: "/create/detail",
      },
    ];
  },
  experimental: {
    windowHistorySupport: true,
  },
};

export default nextConfig;
