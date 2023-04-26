import { moonbeam as moonbeamConfig } from "wagmi/chains";

import { ChainExtension } from "../interface";

export const moonbeam: ChainExtension = {
  ...moonbeamConfig,
  networkNameOverride: "moonbeam",
};
