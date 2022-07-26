import { Chain } from "wagmi";

const avalanche: Chain = {
  id: 43113,
  name: "Avalanche FUJI C-Chain",
  network: "avalanche",
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

const moonbeam: Chain = {
  id: 1287,
  name: "Moonbase Alpha",
  network: "moonbeam",
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

export const testnetChains = [avalanche, moonbeam];
