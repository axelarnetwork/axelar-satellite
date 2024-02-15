import { CosmosChain } from "../interface";
import { acrechain } from "./acrechain";
import { aura } from "./aura";
import { axelar } from "./axelar";
import { burnt } from "./burnt";
import { celestia } from "./celestia";
import { comdex } from "./comdex";
import { cosmoshub } from "./cosmoshub";
import { crescent } from "./crescent";
import { dymension } from "./dymension";
import { elys } from "./elys";
import { evmos } from "./evmos";
import { fetch } from "./fetch";
import { fxcore } from "./fxcore";
import { haqq } from "./haqq";
import { kujira } from "./kujira";
import { neutron } from "./neutron";
import { nibiru } from "./nibiru";
import { odin } from "./odin";
import { ojo } from "./ojo";
import { osmosis } from "./osmosis";
import { persistence } from "./persistence";
import { provenance } from "./provenance";
import { saga } from "./saga";
import { secret } from "./secret";
import { sei } from "./sei";
import { teritori } from "./teritori";
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
  saga,
  cosmoshub,
  crescent,
  nibiru,
  elys,
  dymension,
  fetch,
  fxcore,
  persistence,
  xpla,
  burnt,
  acrechain,
  odin,
  ojo,
  secret,
  neutron,
  teritori,
  haqq,
  celestia,
  provenance,
];
