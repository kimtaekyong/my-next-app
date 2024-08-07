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
};

export default nextConfig;
