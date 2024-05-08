import { Bech32Address } from "@keplr-wallet/cosmos";

import { CosmosChain } from "../interface";

export const nolus: CosmosChain = {
  rpc: `https://nolus-rpc.lavenderfive.com`,
  rest: "https://nolus-api.lavenderfive.com",
  chainId: "pirin-1",
  chainName: "nolus",
  stakeCurrency: {
    coinDenom: "NLS",
    coinMinimalDenom: "unls",
    coinDecimals: 6,
  },
  bech32Config: Bech32Address.defaultBech32Config("nolus"),
  bip44: {
    coinType: 118,
  },
  currencies: [
    {
      coinDenom: "NLS",
      coinMinimalDenom: "unls",
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "NLS",
      coinMinimalDenom: "unls",
      coinDecimals: 6,
      gasPriceStep: {
        low: 0.05,
        average: 0.125,
        high: 0.2,
      },
    },
  ],
  features: ["stargate", "no-legacy-stdTx", "ibc-transfer"],
  chainIdentifier: "nolus",
  chainToAxelarChannelId: "channel-10177",
  explorer: "https://nolus.explorers.guru/",
};
