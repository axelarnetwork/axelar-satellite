export default {
  id: 4002,
  name: "Fantom Testnet",
  network: "fantom",
  networkNameOverride: "fantom",
  nativeCurrency: {
    name: "Fantom",
    symbol: "FTM",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "ftmscan",
      url: "https://testnet.ftmscan.com/",
    },
  },
  rpcUrls: {
    default: "https://rpc.testnet.fantom.network",
  },
  testnet: true,
};
