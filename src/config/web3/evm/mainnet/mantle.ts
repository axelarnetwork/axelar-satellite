import { ChainExtension } from "../interface";

export const mantle: ChainExtension = {
  id: 5000,
  name: "Mantle",
  network: "mantle",
  networkNameOverride: "mantle",
  nativeCurrency: {
    name: "MNT",
    symbol: "MNT",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "Mantle Explorer",
      url: "https://explorer.mantle.xyz",
    },
  },
  rpcUrls: {
    default: {
      http: ["https://mantle.publicnode.com"],
    },
    public: {
      http: ["https://mantle.publicnode.com"],
    },
  },
  testnet: false,
};
