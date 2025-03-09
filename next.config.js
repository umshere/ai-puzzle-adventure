/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Configure image domains if needed
  images: {
    domains: [],
  },

  // Environment variables that should be available to the browser
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },

  // Configure webpack to handle Phaser correctly
  webpack: (config) => {
    // Add support for importing Phaser
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/phaser/,
      type: "javascript/auto",
    });

    return config;
  },
};

module.exports = nextConfig;
