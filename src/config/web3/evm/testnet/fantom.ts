import { fantomTestnet as fantomConfig } from "viem/chains";

import { ChainExtension } from "../interface";

export const fantom: ChainExtension = {
  ...fantomConfig,
  networkNameOverride: "fantom",
};
