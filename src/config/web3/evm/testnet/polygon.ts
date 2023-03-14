import { polygonMumbai as polygonConfig } from "wagmi/chains";

import { ChainExtension } from "../interface";

export const polygon: ChainExtension = {
  ...polygonConfig,
  networkNameOverride: "polygon",
};
