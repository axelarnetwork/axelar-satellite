function getSiteUrl() {
  switch (process.env.NEXT_PUBLIC_ENVIRONMENT) {
    case "testnet":
      return "https://testnet.satellite.money";
    case "mainnet":
      return "https://satellite.money";
    default:
      return "https://testnet.satellite.money";
  }
}

export const siteMetadata = {
  title: "Satellite | Powered by Axelar Network",
  description:
    "Transfer assets between EVM & Cosmos chains. Powered by the interchain infrastructure of Axelar Network.",
  language: "en-us",
  theme: "dark",
  siteUrl: getSiteUrl(),
  siteLogo: "/fav.svg",
  socialBanner: "/social.jpg",
  locale: "en-US",
  twitter: "@axelarcore",
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports plausible, simpleAnalytics, umami or googleAnalytics
    plausibleDataDomain: "", // e.g. tailwind-nextjs-starter-blog.vercel.app
    simpleAnalytics: false, // true or false
    umamiWebsiteId: "", // e.g. 123e4567-e89b-12d3-a456-426614174000
    googleAnalyticsId: "", // e.g. UA-000000-2 or G-XXXXXXX
    posthogAnalyticsId: "", // posthog.init e.g. phc_5yXvArzvRdqtZIsHkEm3Fkkhm3d0bEYUXCaFISzqPSQ
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus
    // Please add your .env file and modify it according to your selection
    provider: "buttondown",
  },
};
