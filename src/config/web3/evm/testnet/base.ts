import { baseGoerli } from "wagmi/chains";

import { ChainExtension } from "../interface";

export const base: ChainExtension = {
  ...baseGoerli,
  networkNameOverride: "base",
};
