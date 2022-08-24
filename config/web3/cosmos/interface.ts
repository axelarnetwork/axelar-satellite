import { ChainInfo } from "@keplr-wallet/types";

export interface CosmosChain extends ChainInfo {
  chainIdentifier: string;
  chainToAxelarChannelId: string;
}