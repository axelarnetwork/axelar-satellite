import { baseSepolia } from "viem/chains";

import { ChainExtension } from "../interface";

export const base: ChainExtension = {
  ...baseSepolia,
  networkNameOverride: "base",
};
