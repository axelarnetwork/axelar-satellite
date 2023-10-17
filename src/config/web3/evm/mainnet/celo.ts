import { celo as celoConfig } from "viem/chains";

import { ChainExtension } from "../interface";

export const celo: ChainExtension = {
  ...celoConfig,
  networkNameOverride: "celo",
};
