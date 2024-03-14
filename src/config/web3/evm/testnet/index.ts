import { ChainExtension } from "../interface";
import { arbitrum } from "./arbitrum";
import { aurora } from "./aurora";
import { avalanche } from "./avalanche";
import { base } from "./base";
import { binance } from "./binance";
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
import { polygonZkEvm } from "./polygon-zkevm";
import { scroll } from "./scroll";

export const testnetChains: ChainExtension[] = [
  aurora,
  avalanche,
  base,
  ethereum,
  moonbeam,
  fantom,
  filecoin,
  fraxtal,
  polygon,
  polygonZkEvm,
  binance,
  kava,
  arbitrum,
  celo,
  optimism,
  linea,
  mantle,
  scroll,
];
