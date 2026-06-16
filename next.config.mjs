/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  // Don't let a lint rule fail the Vercel production build; types still checked.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
