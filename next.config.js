const { createSecureHeaders } = require("next-secure-headers");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  headers() {
    return [
      {
        source: "/(.*)",
        headers: createSecureHeaders(),
      },
    ];
  },
  images: {
    domains: [
      "axelarscan.io",
      "raw.githubusercontent.com",
      "assets.coingecko.com",
      "s2.coinmarketcap.com",
      "tokens.pancakeswap.finance",
      "assets-cdn.trustwallet.com",
      "assets.spooky.fi",
      "polygonscan.com",
      "i.ibb.co",
      "oceanprotocol.com",
      "tokens.1inch.io",
    ],
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
