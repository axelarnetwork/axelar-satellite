import { auroraTestnet } from "viem/chains";

import { ChainExtension } from "../interface";

export const aurora: ChainExtension = {
  ...auroraTestnet,
  networkNameOverride: "aurora",
};
