export const kava = {
  id: 2221,
  name: "Kava EVM Testnet",
  network: "kava",
  networkNameOverride: "kava",
  nativeCurrency: {
    name: "KAVA",
    symbol: "KAVA",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "Kava EVM Explorer",
      url: "https://explorer.evm-alpha.kava.io/",
    },
  },
  rpcUrls: {
    default: "https://evm.testnet.kava.io",
  },
  testnet: true,
};
