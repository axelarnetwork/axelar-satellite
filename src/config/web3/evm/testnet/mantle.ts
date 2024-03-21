import { defineChain } from "viem";

import { ChainExtension } from "../interface";

export const mantle: ChainExtension = defineChain({
  id: 5003,
  network: "mantle-sepolia",
  name: "Mantle Sepolia",
  nativeCurrency: { name: "MNT", symbol: "MNT", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia.mantle.xyz"],
    },
    public: {
      http: ["https://rpc.sepolia.mantle.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "mantle testnet",
      url: "https://explorer.testnet.mantle.xyz",
      apiUrl: "https://api.testnet.mantle.xyz",
    },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
    },
  },
  testnet: true,
  networkNameOverride: "mantle-sepolia",
});
