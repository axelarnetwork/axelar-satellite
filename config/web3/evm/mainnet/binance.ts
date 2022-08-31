export default {
  id: 56,
  name: "Binance Smart Chain",
  network: "binance",
  networkNameOverride: "binance",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "binance",
      url: "https://bscscan.com/",
    },
  },
  rpcUrls: {
    default: "https://bsc-dataseed.binance.org",
  },
  testnet: false,
};
