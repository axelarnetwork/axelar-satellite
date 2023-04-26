import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const crescent: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/crescent`,
  rest: "https://mainnet.crescent.network:1317",
  chainId: "crescent-1",
  chainName: "Crescent",
  chainIdentifier: "crescent",

  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "cre",
    bech32PrefixAccPub: "crepub",
    bech32PrefixValAddr: "crevaloper",
    bech32PrefixValPub: "crevaloperpub",
    bech32PrefixConsAddr: "crevalcons",
    bech32PrefixConsPub: "crevalconspub",
  },
  currencies: [
    {
      coinDenom: "CRE",
      coinMinimalDenom: "ucre",
      coinDecimals: 6,
      coinGeckoId: "crescent",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "CRE",
      coinMinimalDenom: "ucre",
      coinDecimals: 6,
      coinGeckoId: "crescent",
      gasPriceStep: {
        low: 1,
        average: 1,
        high: 1,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "CRE",
    coinMinimalDenom: "ucre",
    coinDecimals: 6,
    coinGeckoId: "crescent",
  },
  coinType: 118,
  features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
  chainToAxelarChannelId: "channel-4",
  explorer: "https://www.mintscan.io/crescent/account/",
};
