import { avalancheFuji as avalancheConfig } from "viem/chains";

import { ChainExtension } from "../interface";

export const avalanche: ChainExtension = {
  ...avalancheConfig,
  networkNameOverride: "avalanche",
};
