import { defineChain } from "viem";

import { ChainExtension } from "../interface";

export const fraxtal: ChainExtension = defineChain({
  id: 2522,
  network: "fraxtal",
  name: "Fraxtal Testnet",
  nativeCurrency: { name: "Frax Ether", symbol: "frxETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.frax.com"],
    },
    public: {
      http: ["https://rpc.testnet.frax.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "fraxscan testnet",
      url: "https://holesky.fraxscan.com",
      apiUrl: "https://api-holesky.fraxscan.com/api",
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
    },
  },
  testnet: true,
  networkNameOverride: "fraxtal",
});
