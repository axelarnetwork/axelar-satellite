import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const umee: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/umee`,
  rest: "https://umee-api.polkachu.com",
  chainId: "umee-1",
  chainName: "Umee",
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config("umee"),
  currencies: [
    {
      coinDenom: "UMEE",
      coinMinimalDenom: "uumee",
      coinDecimals: 6,
      coinGeckoId: "pool:uumee",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "UMEE",
      coinMinimalDenom: "uumee",
      coinDecimals: 6,
      coinGeckoId: "pool:uumee",
    },
  ],
  stakeCurrency: {
    coinDenom: "UMEE",
    coinMinimalDenom: "uumee",
    coinDecimals: 6,
    coinGeckoId: "pool:uumee",
  },
  chainIdentifier: "umee",
  chainToAxelarChannelId: "channel-33",
  explorer: "https://www.mintscan.io/umee/account/",
  features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
};
