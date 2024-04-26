import { Bech32Address } from "@keplr-wallet/cosmos";

import { CosmosChain } from "../interface";

export const ojo: CosmosChain = {
  rpc: `https://rpc.agamotto-val-stage-0.ojo.network`,
  rest: "https://api.agamotto-val-stage-0.ojo.network",
  chainId: "agamotto",
  chainName: "Ojo",
  chainIdentifier: "ojo",
  stakeCurrency: {
    coinDenom: "OJO",
    coinMinimalDenom: "uojo",
    coinDecimals: 6,
    coinGeckoId: "ojo",
  },
  bech32Config: Bech32Address.defaultBech32Config("ojo"),
  bip44: { coinType: 60 },
  currencies: [
    {
      coinDenom: "OJO",
      coinMinimalDenom: "uojo",
      coinDecimals: 6,
      coinGeckoId: "ojo",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "OJO",
      coinMinimalDenom: "uojo",
      coinDecimals: 6,
      coinGeckoId: "ojo",
      gasPriceStep: {
        low: 0.05,
        average: 0.125,
        high: 0.2,
      },
    },
  ],
  features: ["stargate", "no-legacy-stdTx", "ibc-transfer"],
  chainToAxelarChannelId: "channel-1",
  explorer: "https://agamotto.ojo.network/agamotto",
};
