/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,

  images: {
    dangerouslyAllowSVG: true,
    domains: ["rb.gy"],
  },
};
