import { CosmosChain } from "../interface";
import { acrechain } from "./acrechain";
import { aura } from "./aura";
import { axelar } from "./axelar";
import { burnt } from "./burnt";
import { comdex } from "./comdex";
import { cosmoshub } from "./cosmoshub";
import { crescent } from "./crescent";
import { evmos } from "./evmos";
import { fetch } from "./fetch";
import { kujira } from "./kujira";
import { neutron } from "./neutron";
import { odin } from "./odin";
import { osmosis } from "./osmosis";
import { persistence } from "./persistence";
import { secret } from "./secret";
import { sei } from "./sei";
import { terra } from "./terra";
import { xpla } from "./xpla";

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
  odin,
  secret,
  neutron,
];
