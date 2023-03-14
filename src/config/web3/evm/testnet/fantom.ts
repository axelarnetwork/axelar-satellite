import { fantomTestnet as fantomConfig } from "wagmi/chains";

import { ChainExtension } from "../interface";

export const fantom: ChainExtension = {
  ...fantomConfig,
  networkNameOverride: "fantom",
};
