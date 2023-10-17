import { scrollSepolia } from "viem/chains";

import { ChainExtension } from "../interface";

export const scroll: ChainExtension = {
  ...scrollSepolia,
  networkNameOverride: "scroll",
};
