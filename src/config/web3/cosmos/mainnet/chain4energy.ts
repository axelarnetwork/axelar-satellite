import { Bech32Address } from "@keplr-wallet/cosmos";

import { CosmosChain } from "../interface";

export const chain4energy: CosmosChain = {
  rpc: `https://rpc.c4e.io`,
  rest: "https://lcd.c4e.io",
  chainId: "perun-1",
  chainName: "Chain4Energy",
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
        low: 0.01,
        average: 0.025,
        high: 0.03,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "C4E",
    coinMinimalDenom: "uc4e",
    coinDecimals: 6,
    coinGeckoId: "unknown",
  },
  features: ["cosmwasm"],
  chainToAxelarChannelId: "channel-0",
  explorer: "https://explorer.c4e.io/account/",
};
