import { ChainExtension } from "../interface";

export const celo: ChainExtension = {
  id: 42_220,
  name: "Celo",
  network: "celo",
  networkNameOverride: "celo",
  nativeCurrency: {
    name: "CELO",
    symbol: "CELO",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "Celo Explorer",
      url: "https://explorer.celo.org/mainnet/",
    },
  },
  rpcUrls: {
    default: "https://forno.celo.org",
  },
  testnet: false,
};
