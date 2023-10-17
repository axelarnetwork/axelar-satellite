import { linea as lineaMainnet } from "viem/chains";

import { ChainExtension } from "../interface";

export const linea: ChainExtension = {
  ...lineaMainnet,
  networkNameOverride: "linea",
};
