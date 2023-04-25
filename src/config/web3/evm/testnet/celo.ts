import { celoAlfajores } from "wagmi/chains";

import { ChainExtension } from "../interface";

export const celo: ChainExtension = {
  ...celoAlfajores,
  networkNameOverride: "celo",
};
