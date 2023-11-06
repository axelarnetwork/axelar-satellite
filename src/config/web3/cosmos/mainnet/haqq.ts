import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const haqq: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/haqq`,
  rest: "https://rest.cosmos.haqq.network",
  chainId: "haqq_11235-1",
  chainName: "Haqq",
  chainIdentifier: "haqq",
  chainToAxelarChannelId: "channel-1",
  explorer: "",
  bip44: {
    coinType: 60,
  },
  coinType: 60,
  bech32Config: Bech32Address.defaultBech32Config("haqq"),
  currencies: [
    {
      coinDenom: "ISLM",
      coinMinimalDenom: "aISLM",
      coinDecimals: 18,
      coinGeckoId: "unknown",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "ISLM",
      coinMinimalDenom: "aISLM",
      coinDecimals: 18,
      coinGeckoId: "unknown",
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.03,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "ISLM",
    coinMinimalDenom: "aISLM",
    coinDecimals: 18,
    coinGeckoId: "unknown",
  },
  features: ["ibc-transfer", "ibc-go", "eth-address-gen", "eth-key-sign"],
};
