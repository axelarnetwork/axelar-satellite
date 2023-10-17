import { mantleTestnet } from "viem/chains";

import { ChainExtension } from "../interface";

export const mantle: ChainExtension = {
  ...mantleTestnet,
  networkNameOverride: "mantle",
};
