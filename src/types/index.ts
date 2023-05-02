import {
  AssetConfig,
  AssetInfo,
  AssetInfoForChain,
  ChainInfo,
} from "@axelar-network/axelarjs-sdk";

import { TokensWithExtendedChainData } from "~/store";

export type RouteQuery = {
  source: string;
  destination: string;
  asset_denom: string;
};

export type Hash = `0x${string}`;

export type AssetAlias = Pick<
  AssetInfoForChain,
  | "assetSymbol"
  | "assetName"
  | "minDepositAmt"
  | "tokenAddress"
  | "ibcDenom"
  | "fullDenomPath"
  | "common_key"
> & {
  mintLimit: number;
  iconSrc?: string;
  decimals?: number;
  addedViaSquid?: boolean;
};

export interface AssetConfigExtended extends AssetConfig {
  id: string;
  native_chain: string;
  gas_token_id?: string;
  wrapped_erc20: string;
  is_gas_token: boolean;
  isSquidAsset: boolean;
  isSquidOnlyAsset?: boolean;
  chain_aliases: Record<
    // this overwrites the AssetInfo in the sdk because the sdk does not have all the values eg: mintLimit
    string,
    AssetAlias
  >;
  iconSrc?: string;
}

interface AssetInfoExtended extends AssetInfo {
  isSquidAsset?: boolean;
}

export interface ChainInfoExtended extends ChainInfo {
  assets: AssetInfoExtended[];
  squidAssets?: TokensWithExtendedChainData[];
}
