import { filecoinCalibration } from "viem/chains";

import { ChainExtension } from "../interface";

export const filecoin: ChainExtension = {
  ...filecoinCalibration,
  networkNameOverride: "filecoin",
};
