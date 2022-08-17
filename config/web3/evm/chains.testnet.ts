import { Chain } from "wagmi";

const ethereum: Chain = {
  id: 3,
  name: "Ropsten Testnet",
  network: "ethereum",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "etherscan",
      url: "https://ropsten.etherscan.io/",
    },
  },
  rpcUrls: {
    default: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  },
  testnet: true,
};

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

const fantom: Chain = {
  id: 4002,
  name: "Fantom Testnet",
  network: "fantom",
  nativeCurrency: {
    name: "Fantom",
    symbol: "FTM",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "ftmscan",
      url: "https://testnet.ftmscan.com/",
    },
  },
  rpcUrls: {
    default: "https://rpc.testnet.fantom.network",
  },
  testnet: true,
};

const polygon: Chain = {
  id: 80001,
  name: "Polygon Testnet",
  network: "polygon",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "polygonscan",
      url: "https://mumbai.polygonscan.com/",
    },
  },
  rpcUrls: {
    default: "https://rpc-mumbai.maticvigil.com",
  },
  testnet: true,
};

const aurora: Chain = {
  id: 131_316_555,
  name: "Aurora Testnet",
  network: "aurora",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "polygonscan",
      url: "https://testnet.aurorascan.dev/",
    },
  },
  rpcUrls: {
    default: "https://testnet.aurora.dev",
  },
  testnet: true,
};

export const testnetChains = [
  ethereum,
  avalanche,
  moonbeam,
  fantom,
  polygon,
  aurora,
];
