import { ChainExtension } from "../interface";
import { arbitrum } from "./arbitrum";
import { avalanche } from "./avalanche";
import { base } from "./base";
import { binance } from "./binance";
import { blast } from "./blast";
import { celo } from "./celo";
import { ethereum } from "./ethereum";
import { fantom } from "./fantom";
import { filecoin } from "./filecoin";
import { fraxtal } from "./fraxtal";
import { kava } from "./kava";
import { linea } from "./linea";
import { mantle } from "./mantle";
import { moonbeam } from "./moonbeam";
import { optimism } from "./optimism";
import { polygon } from "./polygon";
import { polygonZkEvm } from "./polygonZkEvm";
import { scroll } from "./scroll";

export const mainnetChains: ChainExtension[] = [
  arbitrum,
  avalanche,
  base,
  binance,
  blast,
  celo,
  ethereum,
  filecoin,
  fraxtal,
  kava,
  linea,
  moonbeam,
  fantom,
  polygon,
  polygonZkEvm,
  optimism,
  mantle,
  scroll,
];
