import { polygonZkEvm as polygonZkEvmConfig } from "viem/chains";

import { ChainExtension } from "../interface";

export const polygonZkEvm: ChainExtension = {
  ...polygonZkEvmConfig,
  networkNameOverride: "polygon-zkevm",
};
