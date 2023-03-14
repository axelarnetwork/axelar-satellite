import { bscTestnet as binanceConfig } from "wagmi/chains";

import { ChainExtension } from "../interface";

export const binance: ChainExtension = {
  ...binanceConfig,
  networkNameOverride: "binance",
};
