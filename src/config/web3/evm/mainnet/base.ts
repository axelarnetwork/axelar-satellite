import { ChainExtension } from "../interface";

export const base: ChainExtension = {
  id: 8453,
  name: "Base",
  network: "base",
  networkNameOverride: "base",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "BaseScan",
      url: "https://basescan.org",
    },
  },
  rpcUrls: {
    default: {
      http: ["https://developer-access-mainnet.base.org"],
      webSocket: ["wss://developer-access-mainnet.base.org"],
    },
    public: {
      http: ["https://developer-access-mainnet.base.org"],
      webSocket: ["wss://developer-access-mainnet.base.org"],
    },
  },
  testnet: false,
};
