import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const persistence: CosmosChain = {
  chainId: "core-1",
  chainName: "Persistence",
  chainIdentifier: "persistence",
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/persistence`,
  rest: "https://persistence-api.polkachu.com",
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config("persistence"),
  currencies: [
    {
      coinDenom: "XPRT",
      coinMinimalDenom: "uxprt",
      coinDecimals: 6,
      coinGeckoId: "persistence",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "XPRT",
      coinMinimalDenom: "uxprt",
      coinDecimals: 6,
      coinGeckoId: "persistence",
    },
  ],
  stakeCurrency: {
    coinDenom: "XPRT",
    coinMinimalDenom: "uxprt",
    coinDecimals: 6,
    coinGeckoId: "persistence",
  },
  coinType: 118,
  chainToAxelarChannelId: "channel-51",
} as CosmosChain;
