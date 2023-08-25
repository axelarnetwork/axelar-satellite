import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const teritori: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/teritori`,
  rest: "https://teritori-testnet.api.kjnodes.com",
  chainId: "teritori-testnet-v3",
  chainName: "Teritori Testnet",
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
  features: [
    "stargate",
    "ibc-transfer",
    "cosmwasm",
    "no-legacy-stdTx",
    "ibc-go",
  ],
  chainToAxelarChannelId: "channel-36",
  explorer: "", // TODO: add explorer
};
