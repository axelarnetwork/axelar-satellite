import { polygonZkEvm as polygonZkEvmConfig } from "wagmi/chains";

import { ChainExtension } from "../interface";

export const polygonZkEvm: ChainExtension = {
  ...polygonZkEvmConfig,
  networkNameOverride: "polygon-zkevm",
};
