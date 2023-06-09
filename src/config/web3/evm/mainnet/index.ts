import { ChainExtension } from "../interface";
import { arbitrum } from "./arbitrum";
import { avalanche } from "./avalanche";
import { binance } from "./binance";
import { celo } from "./celo";
import { ethereum } from "./ethereum";
import { fantom } from "./fantom";
import { filecoin } from "./filecoin";
import { kava } from "./kava";
import { moonbeam } from "./moonbeam";
import { optimism } from "./optimism";
import { polygon } from "./polygon";

export const mainnetChains: ChainExtension[] = [
  arbitrum,
  avalanche,
  binance,
  celo,
  ethereum,
  filecoin,
  kava,
  moonbeam,
  fantom,
  polygon,
  optimism,
];
