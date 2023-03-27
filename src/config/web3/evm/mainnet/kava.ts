import { ChainExtension } from "../interface";

export const kava: ChainExtension = {
  id: 2222,
  name: "Kava EVM",
  network: "kava",
  networkNameOverride: "kava",
  nativeCurrency: {
    name: "KAVA",
    symbol: "KAVA",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "Kava Explorer",
      url: "https://explorer.kava.io",
    },
  },
  rpcUrls: {
    default: {
      http: ["https://evm.kava.io"],
    },
    public: {
      http: ["https://evm.kava.io"],
    },
  },
  testnet: false,
};
