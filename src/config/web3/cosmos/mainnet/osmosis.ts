import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const osmosis: CosmosChain = {
  rest: "https://lcd-osmosis.imperator.co",
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/osmosis`,
  chainId: "osmosis-1",
  chainName: "Osmosis",
  chainToAxelarChannelId: "channel-208",
  currencies: [
    {
      coinDenom: "OSMO",
      coinMinimalDenom: "uosmo",
      coinDecimals: 6,
      coinGeckoId: "osmosis",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "OSMO",
      coinMinimalDenom: "uosmo",
      coinDecimals: 6,
      coinGeckoId: "osmosis",
    },
  ],
  stakeCurrency: {
    coinDenom: "OSMO",
    coinMinimalDenom: "uosmo",
    coinDecimals: 6,
    coinGeckoId: "osmosis",
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config("osmo"),
  chainIdentifier: "osmosis",
  explorer: "https://www.mintscan.io/osmosis/account/",
  gas: "400000",
};
