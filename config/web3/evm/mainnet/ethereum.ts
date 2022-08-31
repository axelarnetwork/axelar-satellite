export default {
  id: 1,
  name: "Ethereum Mainnet",
  network: "mainnet",
  networkNameOverride: "ethereum",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "etherscan",
      url: "https://etherscan.io/",
    },
  },
  rpcUrls: {
    default: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  },
  testnet: false,
};
