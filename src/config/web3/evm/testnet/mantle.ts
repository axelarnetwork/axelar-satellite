import { ChainExtension } from "../interface";

export const mantle: ChainExtension = {
  id: 5001,
  name: "Mantle Testnet",
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
      url: "https://explorer.testnet.mantle.xyz",
    },
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.mantle.xyz"],
    },
    public: {
      http: ["https://rpc.testnet.mantle.xyz"],
    },
  },
  testnet: true,
};
