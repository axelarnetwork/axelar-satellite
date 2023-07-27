import { ChainExtension } from "../interface";
import { arbitrum } from "./arbitrum";
import { avalanche } from "./avalanche";
import { base } from "./base";
import { binance } from "./binance";
import { celo } from "./celo";
import { ethereum } from "./ethereum";
import { fantom } from "./fantom";
import { filecoin } from "./filecoin";
import { kava } from "./kava";
import { linea } from "./linea";
import { moonbeam } from "./moonbeam";
import { optimism } from "./optimism";
import { polygon } from "./polygon";
import { polygonZkEvm } from "./polygonZkEvm";

export const mainnetChains: ChainExtension[] = [
  arbitrum,
  avalanche,
  base,
  binance,
  celo,
  ethereum,
  filecoin,
  kava,
  linea,
  moonbeam,
  fantom,
  polygon,
  polygonZkEvm,
  optimism,
];
