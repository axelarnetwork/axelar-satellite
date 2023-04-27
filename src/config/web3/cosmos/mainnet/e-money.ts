import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const eMoney: CosmosChain = {
  rest: "https://emoney.validator.network/api",
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/e-money`,
  chainId: "emoney-3",
  chainIdentifier: "e-money",
  chainName: "e-Money",
  currencies: [
    {
      coinDenom: "NGM",
      coinMinimalDenom: "ungm",
      coinDecimals: 6,
      coinGeckoId: "e-money",
    },
  ],
  bech32Config: Bech32Address.defaultBech32Config("emoney"),
  bip44: {
    coinType: 508,
  },
  stakeCurrency: {
    coinDenom: "NGM",
    coinMinimalDenom: "ungm",
    coinDecimals: 6,
    coinGeckoId: "e-money",
  },
  feeCurrencies: [
    {
      coinDenom: "NGM",
      coinMinimalDenom: "ungm",
      coinDecimals: 6,
      coinGeckoId: "e-money",
    },
  ],
  chainToAxelarChannelId: "channel-26",
  explorer: "https://www.mintscan.io/emoney/account/",
};
