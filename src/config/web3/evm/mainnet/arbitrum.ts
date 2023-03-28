import { arbitrum as arbitrumConfig } from "wagmi/chains";

import { ChainExtension } from "../interface";

export const arbitrum: ChainExtension = {
  ...arbitrumConfig,
  networkNameOverride: "arbitrum",
};
