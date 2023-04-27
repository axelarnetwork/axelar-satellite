import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const ki: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/ki`,
  rest: "https://api-mainnet.blockchain.ki",
  chainId: "kichain-2",
  chainName: "Ki",
  stakeCurrency: {
    coinDenom: "XKI",
    coinMinimalDenom: "uxki",
    coinDecimals: 6,
    coinGeckoId: "ki",
  },
  bech32Config: {
    bech32PrefixAccAddr: "ki",
    bech32PrefixAccPub: "kipub",
    bech32PrefixValAddr: "kivaloper",
    bech32PrefixValPub: "kivaloperpub",
    bech32PrefixConsAddr: "kivalcons",
    bech32PrefixConsPub: "kivalconspub",
  },
  bip44: {
    coinType: 118,
  },
  currencies: [
    {
      coinDenom: "XKI",
      coinMinimalDenom: "uxki",
      coinDecimals: 6,
      coinGeckoId: "ki",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "XKI",
      coinMinimalDenom: "uxki",
      coinDecimals: 6,
      coinGeckoId: "ki",
      gasPriceStep: {
        low: 0.05,
        average: 0.125,
        high: 0.2,
      },
    },
  ],
  features: ["stargate", "no-legacy-stdTx", "ibc-transfer"],
  chainIdentifier: "ki",
  chainToAxelarChannelId: "channel-19",
  explorer: "https://www.mintscan.io/ki-chain/account/",
};
