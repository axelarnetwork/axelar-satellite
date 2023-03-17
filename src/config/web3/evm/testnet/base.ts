import { ChainExtension } from "../interface";

export const base: ChainExtension = {
  id: 84_531,
  name: "Base Goerli Testnet",
  network: "base",
  networkNameOverride: "base",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "Base Scan",
      url: "https://goerli.basescan.org/",
    },
  },
  rpcUrls: {
    default: {
      http: ["https://goerli.base.org"],
    },
  },
  testnet: true,
};
