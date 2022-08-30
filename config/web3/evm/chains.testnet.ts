import { Chain } from "wagmi";

interface ChainExtension extends Chain {
  networkNameOverride: string;
}
const ethereum: ChainExtension = {
  id: 3,
  name: "Ropsten Testnet",
  network: "ropsten",
  networkNameOverride: "ethereum",
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

const avalanche: ChainExtension = {
  id: 43113,
  name: "Avalanche FUJI C-Chain",
  network: "avalanche",
  networkNameOverride: "avalanche",
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

const moonbeam: ChainExtension = {
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

const fantom: ChainExtension = {
  id: 4002,
  name: "Fantom Testnet",
  network: "fantom",
  networkNameOverride: "fantom",
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

const polygon: ChainExtension = {
  id: 80001,
  name: "Polygon Testnet",
  network: "polygon",
  networkNameOverride: "polygon",
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

const aurora: ChainExtension = {
  id: 131_316_555,
  name: "Aurora Testnet",
  network: "aurora",
  networkNameOverride: "aurora",
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
