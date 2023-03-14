import { avalanche as avalancheConfig } from "wagmi/chains";

import { ChainExtension } from "../interface";

export const avalanche: ChainExtension = {
  ...avalancheConfig,
  networkNameOverride: "rvalanche",
  testnet: false,
};
