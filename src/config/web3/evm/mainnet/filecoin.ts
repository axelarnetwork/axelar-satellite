import { ChainExtension } from "../interface";

export const filecoin: ChainExtension = {
  id: 314,
  name: "Filecoin",
  network: "filecoin",
  networkNameOverride: "filecoin",
  nativeCurrency: {
    name: "FIL",
    symbol: "FIL",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "Filecoin EVM Explorer",
      url: "https://filfox.info",
    },
  },
  rpcUrls: {
    default: {
      http: [
        "https://rpc.ankr.com/filecoin",
        "https://api.node.glif.io/rpc/v1",
      ],
    },
    public: {
      http: [
        "https://rpc.ankr.com/filecoin",
        "https://api.node.glif.io/rpc/v1",
      ],
    },
  },
  testnet: false,
};
