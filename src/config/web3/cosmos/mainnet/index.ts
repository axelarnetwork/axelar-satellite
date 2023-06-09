import { CosmosChain } from "../interface";
import { acrechain } from "./acrechain";
import { agoric } from "./agoric";
import { assetmantle } from "./assetmantle";
import { aura } from "./aura";
import { axelar } from "./axelar";
import { carbon } from "./carbon";
import { comdex } from "./comdex";
import { cosmoshub } from "./cosmoshub";
import { crescent } from "./crescent";
import { eMoney } from "./e-money";
import { evmos } from "./evmos";
import { fetch } from "./fetch";
import { injective } from "./injective";
import { juno } from "./juno";
import { ki } from "./ki";
import { kujira } from "./kujira";
import { neutron } from "./neutron";
import { osmosis } from "./osmosis";
import { rebus } from "./rebus";
import { regen } from "./regen";
import { secret } from "./secret";
import { sei } from "./sei";
import { sommelier } from "./sommelier";
import { stargaze } from "./stargaze";
import { stride } from "./stride";
import { terra } from "./terra";
import { terraClassic } from "./terra_classic";
import { umee } from "./umee";
import { xpla } from "./xpla";

export const mainnetChains: CosmosChain[] = [
  acrechain,
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
  fetch,
  comdex,
  regen,
  agoric,
  umee,
  terraClassic,
  xpla,
  carbon,
  stride,
  sommelier,
  neutron,
  sei,
  aura,
  rebus,
];
