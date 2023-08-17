import { goerli as ethereumConfig } from "wagmi/chains";

import { ChainExtension } from "../interface";

export const ethereum: ChainExtension = {
  ...ethereumConfig,
  networkNameOverride: "ethereum",
};
