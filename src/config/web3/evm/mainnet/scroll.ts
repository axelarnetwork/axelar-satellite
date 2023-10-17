import { scroll as scrollMainnet } from "viem/chains";

import { ChainExtension } from "../interface";

export const scroll: ChainExtension = {
  ...scrollMainnet,
  networkNameOverride: "scroll",
};
