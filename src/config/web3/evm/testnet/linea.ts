import { ChainExtension } from "../interface";

export const linea: ChainExtension = {
  id: 59140,
  name: "Linea Testnet",
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
      url: "https://explorer.goerli.linea.build",
    },
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.goerli.linea.build"],
      webSocket: ["wss://rpc.goerli.linea.build"],
    },
    public: {
      http: ["https://rpc.goerli.linea.build"],
      webSocket: ["wss://rpc.goerli.linea.build"],
    },
  },
  testnet: true,
};
