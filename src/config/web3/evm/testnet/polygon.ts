import { polygonMumbai as polygonConfig } from "viem/chains";

import { ChainExtension } from "../interface";

export const polygon: ChainExtension = {
  ...polygonConfig,
  networkNameOverride: "polygon",
};
