import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const ojo: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/ojo`,
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
        low: 0,
        average: 0,
        high: 0,
      },
    },
  ],
  features: ["stargate", "no-legacy-stdTx", "ibc-transfer"],
  chainToAxelarChannelId: "channel-1",
  explorer: "https://agamotto.ojo.network/agamotto",
};
