import { base as baseMainnet } from "viem/chains";

import { ChainExtension } from "../interface";

export const base: ChainExtension = {
  ...baseMainnet,
  networkNameOverride: "base",
};
