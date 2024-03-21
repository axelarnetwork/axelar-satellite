import { defineChain } from "viem";

import { ChainExtension } from "../interface";

export const blast: ChainExtension = defineChain({
  id: 168_587_773,
  name: "Blast Sepolia",
  network: "blast",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["https://sepolia.blast.io"] },
    public: { http: ["https://sepoliablast.io"] },
  },
  blockExplorers: {
    default: { name: "Blastscan", url: "https://testnet.blastscan.io" },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 756690,
    },
  },
  testnet: true,
  networkNameOverride: "blast-sepolia",
});
