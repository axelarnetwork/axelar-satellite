const { createSecureHeaders } = require("next-secure-headers");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: createSecureHeaders({
          contentSecurityPolicy: {
            directives: {
              "default-src": [
                "self",
                "axelar-testnet.s3.us-east-2.amazonaws.com",
                "axelar-mainnet.s3.us-east-2.amazonaws.com",
              ],
              "connect-src": [
                "self",
                "axelar-testnet.s3.us-east-2.amazonaws.com",
                "axelar-mainnet.s3.us-east-2.amazonaws.com",
              ],
            },
          },
        }),
      },
    ];
  },
};

module.exports = nextConfig;
