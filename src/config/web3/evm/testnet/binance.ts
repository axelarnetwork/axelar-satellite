import { ChainExtension } from "../interface";

export const binance: ChainExtension = {
  id: 97,
  name: "Binance Smart Chain - Testnet",
  network: "binance",
  networkNameOverride: "binance",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "binance scan",
      url: "https://testnet.bscscan.com/",
    },
  },
  rpcUrls: {
    default: "https://data-seed-prebsc-1-s1.binance.org:8545",
  },
  testnet: true,
};
