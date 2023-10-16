import { baseGoerli } from "viem/chains";

import { ChainExtension } from "../interface";

export const base: ChainExtension = {
  ...baseGoerli,
  networkNameOverride: "base",
};
