import { ChainExtension } from "../interface";
import ethereum from "./ethereum";
import aurora from "./aurora";
import avalanche from "./avalanche";
import fantom from "./fantom";
import moonbeam from "./moonbeam";
import polygon from "./polygon";
import { binance } from "./binance";
import { kava } from "./kava";

export const testnetChains: ChainExtension[] = [
  aurora,
  avalanche,
  ethereum,
  moonbeam,
  fantom,
  polygon,
  binance,
  kava,
];
