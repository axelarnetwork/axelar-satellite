import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const agoric: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/agoric`,
  rest: "https://main.api.agoric.net",
  chainId: "agoric-3",
  chainName: "Agoric",
  bip44: {
    coinType: 564,
  },
  bech32Config: Bech32Address.defaultBech32Config("agoric"),
  currencies: [
    {
      coinDenom: "BLD",
      coinMinimalDenom: "ubld",
      coinDecimals: 6,
      coinGeckoId: "agoric",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "BLD",
      coinMinimalDenom: "ubld",
      coinDecimals: 6,
      coinGeckoId: "agoric",
    },
  ],
  stakeCurrency: {
    coinDenom: "BLD",
    coinMinimalDenom: "ubld",
    coinDecimals: 6,
    coinGeckoId: "agoric",
  },
  chainIdentifier: "agoric",
  chainToAxelarChannelId: "channel-9",
  features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
  explorer: "https://bigdipper.live/agoric/accounts/",
};
