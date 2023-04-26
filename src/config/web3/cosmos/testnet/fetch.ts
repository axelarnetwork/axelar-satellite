import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const fetch: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/fetch`,
  rest: "https://rest-dorado.fetch.ai",
  chainId: "dorado-1",
  chainName: "Fetch Testnet",
  chainIdentifier: "fetch",
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config("fetch"),
  currencies: [
    {
      coinDenom: "FET",
      coinMinimalDenom: "atestfet",
      coinDecimals: 18,
      coinGeckoId: "fetch-ai",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "FET",
      coinMinimalDenom: "atestfet",
      coinDecimals: 18,
      coinGeckoId: "fetch-ai",
      gasPriceStep: {
        low: 0,
        average: 5000000000,
        high: 6250000000,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "FET",
    coinMinimalDenom: "atestfet",
    coinDecimals: 18,
    coinGeckoId: "fetch-ai",
  },
  coinType: 118,
  features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
  chainToAxelarChannelId: "channel-6",
  explorer: "", // TODO: add explorer
};
