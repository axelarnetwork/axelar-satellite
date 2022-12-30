import terra from "./terra";
import osmosis from "./osmosis";
import kujira from "./kujira";
import axelar from "./axelar";
import sei from "./sei";
import cosmoshub from "./cosmoshub";
import crescent from "./crescent";
import fetch from "./fetch";
import evmos from "./evmos";
import aura from "./aura";
import comdex from "./comdex";
import persistence from "./persistence";
import { CosmosChain } from "../interface";
import xpla from "./xpla";
import burnt from "./burnt";
import acrechain from "./acrechain";

export const testnetChains: CosmosChain[] = [
  terra,
  aura,
  comdex,
  osmosis,
  evmos,
  kujira,
  axelar,
  sei,
  cosmoshub,
  crescent,
  fetch,
  persistence,
  xpla,
  burnt,
  acrechain,
];
