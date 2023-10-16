import { arbitrum as arbitrumConfig } from "viem/chains";

import { ChainExtension } from "../interface";

export const arbitrum: ChainExtension = {
  ...arbitrumConfig,
  networkNameOverride: "arbitrum",
};
