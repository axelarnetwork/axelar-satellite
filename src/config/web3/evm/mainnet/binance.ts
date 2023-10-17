import { bsc as binanceConfig } from "viem/chains";

import { ChainExtension } from "../interface";

export const binance: ChainExtension = {
  ...binanceConfig,
  networkNameOverride: "binance",
};
