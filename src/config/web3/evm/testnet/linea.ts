import { lineaTestnet } from "viem/chains";

import { ChainExtension } from "../interface";

export const linea: ChainExtension = {
  ...lineaTestnet,
  networkNameOverride: "linea",
};
