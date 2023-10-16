import { goerli as ethereumConfig } from "viem/chains";

import { ChainExtension } from "../interface";

export const ethereum: ChainExtension = {
  ...ethereumConfig,
  networkNameOverride: "ethereum",
};
