import { celo as celoConfig } from "wagmi/chains";

import { ChainExtension } from "../interface";

export const celo: ChainExtension = {
  ...celoConfig,
  networkNameOverride: "celo",
};
