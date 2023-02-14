import { ChainExtension } from "../interface";

const CONFIG: ChainExtension = {
  id: 1284,
  name: "Moonbeam",
  network: "moonbeam",
  networkNameOverride: "moonbeam",
  nativeCurrency: {
    decimals: 18,
    name: "Moonbeam",
    symbol: "GLMR",
  },
  rpcUrls: {
    default: "https://rpc.api.moonbeam.network",
  },
  blockExplorers: {
    default: { name: "Moonscan", url: "https://moonscan.io/" },
  },
  testnet: false,
};

export default CONFIG;
