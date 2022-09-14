import { CosmosChain } from "../interface";
import terra from "./terra";
import osmosis from "./osmosis";
import kujira from "./kujira";
import axelar from "./axelar";
import cosmoshub from "./cosmoshub";
import crescent from "./crescent";
import secret from "./secret";
import juno from "./juno";
import eMoney from "./e-money";
import injective from "./injective";
import evmos from "./evmos";
import stargaze from "./stargaze";
import assetmantle from "./assetmantle";
import ki from "./ki";
import fetch from "./fetch";

export const mainnetChains: CosmosChain[] = [
  terra,
  osmosis,
  kujira,
  axelar,
  cosmoshub,
  crescent,
  secret,
  juno,
  eMoney,
  injective,
  evmos,
  stargaze,
  assetmantle,
  ki,
  fetch
];
