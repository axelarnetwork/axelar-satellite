import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const chain4energy: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/chain4energy`,
  rest: "https://lcd-testnet.c4e.io",
  chainId: "babajaga-1",
  chainName: "Chain4Energy Testnet",
  chainIdentifier: "chain4energy",
  bech32Config: Bech32Address.defaultBech32Config("c4e"),
  bip44: {
    coinType: 118,
  },
  currencies: [
    {
      coinDenom: "C4E",
      coinMinimalDenom: "uc4e",
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "C4E",
      coinMinimalDenom: "uc4e",
      coinDecimals: 6,
      gasPriceStep: {
        low: 0,
        average: 0.025,
        high: 0.04,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "C4E",
    coinMinimalDenom: "uc4e",
    coinDecimals: 6,
    coinGeckoId: "chain4energy",
  },
  features: ["cosmwasm"],
  chainToAxelarChannelId: "channel-3",
  explorer: "https://explorer.c4e.io/account/",
};
