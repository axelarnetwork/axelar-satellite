import { filecoin as filecoinMainnet } from "viem/chains";

import { ChainExtension } from "../interface";

export const filecoin: ChainExtension = {
  ...filecoinMainnet,
  networkNameOverride: "filecoin",
};
