import { ChainExtension } from "../interface";

export const moonbeam: ChainExtension = {
  id: 1287,
  name: "Moonbase Alpha",
  network: "moonbeam",
  networkNameOverride: "moonbeam",
  nativeCurrency: {
    decimals: 18,
    name: "Glimmer",
    symbol: "DEV",
  },
  blockExplorers: {
    default: {
      name: "moonscan",
      url: "https://moonbase.moonscan.io/",
    },
  },
  rpcUrls: {
    default: "https://rpc.api.moonbase.moonbeam.network",
  },
  testnet: true,
};
