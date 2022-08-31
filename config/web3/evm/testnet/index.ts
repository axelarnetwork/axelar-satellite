import { ChainExtension } from "../interface";
import ethereum from "./ethereum";
import aurora from "./aurora";
import avalanche from "./avalanche";
import fantom from "./fantom";
import moonbeam from "./moonbeam";
import polygon from "./polygon";

export const testnetChains: ChainExtension[] = [
  aurora,
  avalanche,
  ethereum,
  moonbeam,
  fantom,
  polygon,
];