import { moonbaseAlpha } from "viem/chains";

import { ChainExtension } from "../interface";

export const moonbeam: ChainExtension = {
  ...moonbaseAlpha,
  networkNameOverride: "moonbeam",
};
