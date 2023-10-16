import { moonbeam as moonbeamConfig } from "viem/chains";

import { ChainExtension } from "../interface";

export const moonbeam: ChainExtension = {
  ...moonbeamConfig,
  networkNameOverride: "moonbeam",
};
