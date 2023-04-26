import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const odin: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/odin`,
  rest: "https://node.odin-freya-website.odinprotocol.io/a/api/",
  chainId: "odin-testnet-havi-1",
  chainName: "Odin Protocol Testnet",
  chainIdentifier: "odin",
  stakeCurrency: {
    coinDenom: "odin",
    coinMinimalDenom: "loki",
    coinDecimals: 6,
    coinGeckoId: "odin",
  },
  bech32Config: Bech32Address.defaultBech32Config("odin"),
  bip44: { coinType: 118 },
  currencies: [
    {
      coinDenom: "odin",
      coinMinimalDenom: "loki",
      coinDecimals: 6,
      coinGeckoId: "odin",
    },
    {
      coinDenom: "geo",
      coinMinimalDenom: "mGeo",
      coinDecimals: 6,
      coinGeckoId: "geo",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "odin",
      coinMinimalDenom: "loki",
      coinDecimals: 6,
      coinGeckoId: "odin",
      gasPriceStep: {
        low: 0.0125,
        average: 0.025,
        high: 0.03,
      },
    },
  ],
  features: ["ibc-transfer", "ibc-go"],
  chainToAxelarChannelId: "channel-5",
  explorer: "https://testnet.odinprotocol.io",
};
