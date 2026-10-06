/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Don't let a lint rule fail the Vercel production build; types still checked.
  eslint: { ignoreDuringBuilds: true },
  // Pre-lancio: noindex su tutte le risposte (pagine, file, API)
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
