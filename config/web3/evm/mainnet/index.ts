import { ChainExtension } from "../interface";
import binance from "./binance";
import ethereum from "./ethereum";
import avalanche from "./avalanche";
import fantom from "./fantom";
import moonbeam from "./moonbeam";
import polygon from "./polygon";

export const mainnetChains: ChainExtension[] = [
  avalanche,
  binance,
  ethereum,
  moonbeam,
  fantom,
  polygon,
];
