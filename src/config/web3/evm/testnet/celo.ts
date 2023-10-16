import { celoAlfajores } from "viem/chains";

import { ChainExtension } from "../interface";

export const celo: ChainExtension = {
  ...celoAlfajores,
  networkNameOverride: "celo",
};
