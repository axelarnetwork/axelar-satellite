import { goerli as ethereumConfig } from "wagmi";

import { ChainExtension } from "../interface";

export const ethereum: ChainExtension = {
  ...ethereumConfig,
  networkNameOverride: "ethereum",
};
