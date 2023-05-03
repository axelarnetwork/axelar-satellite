import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const sommelier: CosmosChain = {
  rest: "https://lcd-sommelier.imperator.co",
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/sommelier`,
  chainId: "sommelier-3",
  chainName: "Sommelier",
  chainIdentifier: "sommelier",
  currencies: [
    {
      coinDenom: "SOMM",
      coinMinimalDenom: "usomm",
      coinDecimals: 6,
      coinGeckoId: "usomm",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "SOMM",
      coinMinimalDenom: "usomm",
      coinDecimals: 6,
      coinGeckoId: "usomm",
    },
  ],
  stakeCurrency: {
    coinDenom: "SOMM",
    coinMinimalDenom: "usomm",
    coinDecimals: 6,
    coinGeckoId: "usomm",
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config("somm"),
  chainToAxelarChannelId: "channel-5",
  explorer: "https://www.mintscan.io/sommelier/account/",
};
