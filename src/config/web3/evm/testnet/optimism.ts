import { optimismGoerli as optimismConfig } from "viem/chains";

import { ChainExtension } from "../interface";

export const optimism: ChainExtension = {
  ...optimismConfig,
  networkNameOverride: "optimism",
};
