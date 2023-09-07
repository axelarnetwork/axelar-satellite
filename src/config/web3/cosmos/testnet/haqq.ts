import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const haqq: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/haqq`,
  rest: "https://rest.cosmos.testedge2.haqq.network",
  chainId: "haqq_54211-3",
  chainName: "Haqq Testnet",
  chainIdentifier: "haqq",
  bip44: {
    coinType: 60,
  },
  bech32Config: Bech32Address.defaultBech32Config("haqq"),
  currencies: [
    {
      coinDenom: "ISLM",
      coinMinimalDenom: "aISLM",
      coinDecimals: 18,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "ISLM",
      coinMinimalDenom: "aISLM",
      coinDecimals: 18,
      gasPriceStep: {
        low: 10000000000,
        average: 25000000000,
        high: 40000000000,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "ISLM",
    coinMinimalDenom: "aISLM",
    coinDecimals: 18,
  },
  coinType: 60,
  features: ["ibc-transfer", "ibc-go", "eth-address-gen", "eth-key-sign"],
  chainToAxelarChannelId: "channel-4",
  explorer: "", // TODO: add explorer,
  beta: true,
};
