import { ChainExtension } from "../interface";
import binance from "./binance";
import ethereum from "./ethereum";
import avalanche from "./avalanche";
import fantom from "./fantom";
import moonbeam from "./moonbeam";
import polygon from "./polygon";
import arbitrum from "./arbitrum";
import celo from "./celo";
import kava from "./kava";

export const mainnetChains: ChainExtension[] = [
  arbitrum,
  avalanche,
  binance,
  celo,
  ethereum,
  kava,
  moonbeam,
  fantom,
  polygon,
];
