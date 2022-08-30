export default {
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
