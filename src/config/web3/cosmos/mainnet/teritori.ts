import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const teritori: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/teritori`,
  rest: "https://rest.cosmos.haqq.network",
  chainId: "teritori-1",
  chainName: "Teritori",
  chainIdentifier: "teritori",
  bech32Config: Bech32Address.defaultBech32Config("tori"),
  bip44: {
    coinType: 118,
  },
  currencies: [
    {
      coinDenom: "TORI",
      coinMinimalDenom: "utori",
      coinDecimals: 6,
      coinGeckoId: "teritori",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "TORI",
      coinMinimalDenom: "utori",
      coinDecimals: 6,
      coinGeckoId: "teritori",
      gasPriceStep: {
        low: 0,
        average: 0.025,
        high: 0.04,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "TORI",
    coinMinimalDenom: "utori",
    coinDecimals: 6,
    coinGeckoId: "teritori",
  },
  features: ["ibc-transfer", "cosmwasm", "ibc-go"],
  chainToAxelarChannelId: "channel-61",
  explorer: "", // TODO: add explorer
};
