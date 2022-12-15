export type RouteQuery = {
  source: string;
  destination: string;
  asset_denom: string;
};

export type Hash = `0x${string}`;

export interface AssetConfigExtended {
  id: string;
  common_key: {
    devnet: string;
    testnet: string;
    mainnet: string;
  };
  native_chain: string;
  fully_supported: boolean;
  decimals: number;
  wrapped_erc20: string;
  is_gas_token: boolean;
  chain_aliases: Record<
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
