export default {
  id: 131_316_555,
  name: "Aurora Testnet",
  network: "aurora",
  networkNameOverride: "aurora",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "polygonscan",
      url: "https://testnet.aurorascan.dev/",
    },
  },
  rpcUrls: {
    default: "https://testnet.aurora.dev",
  },
  testnet: true,
};