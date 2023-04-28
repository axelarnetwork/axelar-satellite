import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const osmosis: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/osmosis`,
  rest: "https://lcd.osmotest5.osmosis.zone",
  chainId: "osmo-test-5",
  chainName: "Osmosis Testnet",
  chainIdentifier: "osmosis",
  stakeCurrency: {
    coinDenom: "OSMO",
    coinMinimalDenom: "uosmo",
    coinDecimals: 6,
    coinGeckoId: "osmosis",
    coinImageUrl: "https://dhj8dql1kzq2v.cloudfront.net/white/osmo.png",
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config("osmo"),
  currencies: [
    {
      coinDenom: "OSMO",
      coinMinimalDenom: "uosmo",
      coinDecimals: 6,
      coinGeckoId: "osmosis",
      coinImageUrl: "https://dhj8dql1kzq2v.cloudfront.net/white/osmo.png",
    },
    {
      coinDenom: "ION",
      coinMinimalDenom: "uion",
      coinDecimals: 6,
      coinGeckoId: "ion",
      coinImageUrl:
        "https://dhj8dql1kzq2v.cloudfront.net/white/osmosis-ion.png",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "OSMO",
      coinMinimalDenom: "uosmo",
      coinDecimals: 6,
      coinGeckoId: "osmosis",
      coinImageUrl: "https://dhj8dql1kzq2v.cloudfront.net/white/osmo.png",
      gasPriceStep: {
        low: 0,
        average: 0,
        high: 0.025,
      },
    },
  ],
  coinType: 118,
  features: ["ibc-transfer", "ibc-go"],
  chainToAxelarChannelId: "channel-3",
  explorer: "", // TODO: add explorer
};
