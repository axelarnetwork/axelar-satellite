import { SigningStargateClientOptions } from "@cosmjs/stargate";
import { ChainInfo } from "@keplr-wallet/types";

export interface CosmosChain extends ChainInfo {
  chainIdentifier: string;
  chainToAxelarChannelId: string;
  explorer: string;
  signingClientOptions?: SigningStargateClientOptions;
  gas?: string;
}
