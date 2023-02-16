import { ChainExtension } from "../interface";

export const optimism: ChainExtension = {
  id: 420,
  name: "Optimism Goerli Testnet",
  network: "optimism-goerli",
  networkNameOverride: "optimism",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://goerli-optimism.etherscan.io/",
    },
  },
  rpcUrls: {
    default: "https://goerli.optimism.io",
  },
  testnet: true,
};
