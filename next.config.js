/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["your-image-domain.com"], // If using external images
  },
  webpack: (config) => {
    config.resolve.fallback = {
      "mongodb-client-encryption": false,
      aws4: false,
    };
    return config;
  },
};

module.exports = nextConfig;
