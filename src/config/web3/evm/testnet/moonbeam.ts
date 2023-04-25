import { moonbaseAlpha } from "wagmi/chains";

import { ChainExtension } from "../interface";

export const moonbeam: ChainExtension = {
  ...moonbaseAlpha,
  networkNameOverride: "moonbeam",
};
