import { AssetConfig } from "@axelar-network/axelarjs-sdk";

export type RouteQuery = {
  source: string;
  destination: string;
  asset_denom: string;
};

export type Hash = `0x${string}`;

export interface AssetConfigExtended extends AssetConfig {
  id: string;
  native_chain: string;
  wrapped_erc20: string;
  is_gas_token: boolean;
  isSquidAsset: boolean;
  chain_aliases: Record<
    // this overwrites the AssetInfo in the sdk because the sdk does not have all the values eg: mintLimit
    string,
    {
      assetSymbol: string;
      assetName: string;
      minDepositAmt: number;
      ibcDenom: string;
      fullDenomPath: string;
      tokenAddress: string;
      mintLimit: number;
    }
  >;
}
