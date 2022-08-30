export default {
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