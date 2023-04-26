import { auroraTestnet } from "wagmi/chains";

import { ChainExtension } from "../interface";

export const aurora: ChainExtension = {
  ...auroraTestnet,
  networkNameOverride: "aurora",
};
