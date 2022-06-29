import { Chain } from "wagmi";

const avalanche: Chain = {
  id: 43113,
  name: "Avalanche FUJI C-Chain",
  network: "avalanche-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Avalanche",
    symbol: "AVAX",
  },
  blockExplorers: {
    default: {
      name: "snowtrace",
      url: "https://testnet.snowtrace.io/",
    },
  },
  rpcUrls: {
    default: "https://api.avax-test.network/ext/bc/C/rpc",
  },
  testnet: true,
};

export const testnetChains = [avalanche];
