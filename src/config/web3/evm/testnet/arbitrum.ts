import { ChainExtension } from "../interface";

export const arbitrum: ChainExtension = {
  id: 421_613,
  name: "Arbitrum Goerli Testnet",
  network: "ethereum",
  networkNameOverride: "arbitrum",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "Arbitrum Explorer",
      url: "https://goerli-rollup-explorer.arbitrum.io/",
    },
  },
  rpcUrls: {
    default: "https://goerli-rollup.arbitrum.io/rpc",
  },
  testnet: true,
};
