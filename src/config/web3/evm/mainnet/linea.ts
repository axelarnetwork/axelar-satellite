import { ChainExtension } from "../interface";

export const linea: ChainExtension = {
  id: 59144,
  name: "Linea",
  network: "linea",
  networkNameOverride: "linea",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://explorer.linea.build",
    },
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.linea.build"],
      webSocket: ["wss://rpc.linea.build"],
    },
    public: {
      http: ["https://rpc.linea.build"],
      webSocket: ["wss://rpc.linea.build"],
    },
  },
  testnet: false,
};
