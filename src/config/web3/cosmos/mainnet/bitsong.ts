import { Bech32Address } from "@keplr-wallet/cosmos";

import { CosmosChain } from "../interface";

export const bitsong: CosmosChain = {
  rpc: `https://rpc.explorebitsong.com`,
  rest: "https://bitsong-api.lavenderfive.com",
  chainId: "bitsong-2b",
  chainName: "BitSong",
  stakeCurrency: {
    coinDenom: "BTSG",
    coinMinimalDenom: "ubtsg",
    coinDecimals: 6,
  },
  bech32Config: Bech32Address.defaultBech32Config("bitsong"),
  bip44: {
    coinType: 639,
  },
  currencies: [
    {
      coinDenom: "BTSG",
      coinMinimalDenom: "ubtsg",
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "BTSG",
      coinMinimalDenom: "ubtsg",
      coinDecimals: 6,
      gasPriceStep: {
        low: 0.05,
        average: 0.125,
        high: 0.2,
      },
    },
  ],
  features: ["cosmwasm"],
  chainIdentifier: "bitsong",
  chainToAxelarChannelId: "channel-30",
  explorer: "https://explorebitsong.com/bitsong",
};
