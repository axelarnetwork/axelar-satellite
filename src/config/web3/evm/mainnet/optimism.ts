import { optimism as optimismConfig } from "wagmi/chains";

import { ChainExtension } from "../interface";

export const optimism: ChainExtension = {
  ...optimismConfig,
  rpcUrls: {
    default: {
      http: [
        "https://optimism-mainnet.public.blastapi.io",
        "https://optimism.publicnode.com",
      ],
    },
    public: {
      http: [
        "https://optimism-mainnet.public.blastapi.io",
        "https://optimism.publicnode.com",
      ],
    },
  },
  networkNameOverride: "optimism",
};
