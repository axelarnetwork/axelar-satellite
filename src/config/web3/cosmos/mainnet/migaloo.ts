import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const migaloo: CosmosChain = {
  chainId: "migaloo-1",
  chainName: "Migaloo",
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/migaloo`,
  rest: "https://api-whitewhale-ia.cosmosia.notional.ventures",
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config("migaloo"),
  currencies: [
    {
      coinDenom: "WHALE",
      coinMinimalDenom: "uwhale",
      coinDecimals: 6,
      coinGeckoId: "white-whale",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "WHALE",
      coinMinimalDenom: "uwhale",
      coinDecimals: 6,
      coinGeckoId: "white-whale",
      gasPriceStep: {
        low: 0.25,
        average: 0.3,
        high: 0.35,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "WHALE",
    coinMinimalDenom: "uwhale",
    coinDecimals: 6,
    coinGeckoId: "white-whale",
  },
  features: ["cosmwasm"],
  coinType: 118,
  chainIdentifier: "migaloo",
  chainToAxelarChannelId: "channel-53",
  explorer: "", // TODO: add explorer,
};
