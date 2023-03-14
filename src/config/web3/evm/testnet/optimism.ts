import { optimismGoerli as optimismConfig } from "wagmi/chains";

import { ChainExtension } from "../interface";

export const optimism: ChainExtension = {
  ...optimismConfig,
  networkNameOverride: "optimism",
};
