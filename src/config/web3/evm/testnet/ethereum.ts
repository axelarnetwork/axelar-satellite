import { ChainExtension } from "../interface";

export const ethereum: ChainExtension = {
  id: 5,
  name: "Goerli Testnet",
  network: "goerli",
  networkNameOverride: "ethereum",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "etherscan",
      url: "https://goerli.etherscan.io/",
    },
  },
  rpcUrls: {
    default: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  },
  testnet: true,
};
