import { ChainExtension } from "../interface";
import { arbitrum } from "./arbitrum";
import aurora from "./aurora";
import avalanche from "./avalanche";
import { binance } from "./binance";
import { celo } from "./celo";
import ethereum from "./ethereum";
import fantom from "./fantom";
import { kava } from "./kava";
import moonbeam from "./moonbeam";
import polygon from "./polygon";

export const testnetChains: ChainExtension[] = [
  aurora,
  avalanche,
  ethereum,
  moonbeam,
  fantom,
  polygon,
  binance,
  kava,
  arbitrum,
  celo,
];
