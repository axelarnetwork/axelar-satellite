import { defineChain } from "viem";

import { ChainExtension } from "../interface";

export const fraxtal: ChainExtension = defineChain({
  id: 252,
  network: "fraxtal",
  name: "Fraxtal",
  nativeCurrency: { name: "Frax Ether", symbol: "frxETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.frax.com"],
    },
    public: {
      http: ["https://rpc.frax.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "fraxscan",
      url: "https://fraxscan.com",
      apiUrl: "https://api.fraxscan.com/api",
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
    },
  },
  networkNameOverride: "fraxtal",
});
