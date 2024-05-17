import { defineChain } from "viem";

import { ChainExtension } from "../interface";

export const immutable: ChainExtension = defineChain({
  id: 13371,
  network: "immutable",
  name: "Immutable",
  nativeCurrency: { name: "IMX", symbol: "IMX", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.immutable.com"],
    },
    public: {
      http: ["https://rpc.immutable.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Immutable",
      url: "https://explorer.immutable.com",
      apiUrl: "",
    },
  },
  networkNameOverride: "immutable",
});
