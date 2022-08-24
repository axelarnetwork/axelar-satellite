import terra from "./terra";
import osmosis from "./osmosis";
import kujira from "./kujira";
import axelar from "./axelar";
import sei from "./sei";
import cosmoshub from "./cosmoshub";
import crescent from "./crescent";
import fetch from "./fetch";
import { CosmosChain } from "../interface";

export const testnetChains: CosmosChain[] = [
  terra,
  osmosis,
  kujira,
  axelar,
  sei,
  cosmoshub,
  crescent,
  fetch,
];
