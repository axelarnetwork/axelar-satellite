import { ChainInfo } from "@keplr-wallet/types";
import terra from "./testnet/terra";
import osmosis from "./testnet/osmosis";
import kujira from "./testnet/kujira";
import axelar from "./testnet/axelar";
import sei from "./testnet/sei";
import cosmoshub from "./testnet/cosmoshub";
import crescent from "./testnet/crescent";
import fetch from "./testnet/fetch";

export interface CosmosChain extends ChainInfo {
  chainIdentifier: string;
}

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
