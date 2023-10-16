import { mantle as mantleMainnet } from "viem/chains";

import { ChainExtension } from "../interface";

export const mantle: ChainExtension = {
  ...mantleMainnet,
  networkNameOverride: "mantle",
};
