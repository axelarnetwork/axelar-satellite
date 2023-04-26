import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const kujira: CosmosChain = {
  chainId: "kaiyo-1",
  chainName: "Kujira",
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/kujira`,
  rest: "https://lcd.kaiyo.kujira.setten.io",
  bip44: { coinType: 118 },
  bech32Config: {
    bech32PrefixAccAddr: "kujira",
    bech32PrefixAccPub: "kujirapub",
    bech32PrefixValAddr: "kujiravaloper",
    bech32PrefixValPub: "kujiravaloperpub",
    bech32PrefixConsAddr: "kujiravalcons",
    bech32PrefixConsPub: "kujiravalconspub",
  },
  currencies: [
    {
      coinDenom: "KUJI",
      coinMinimalDenom: "ukuji",
      coinDecimals: 6,
      coinGeckoId: "kujira",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "KUJI",
      coinMinimalDenom: "ukuji",
      coinDecimals: 6,
      coinGeckoId: "kujira",
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.03,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "KUJI",
    coinMinimalDenom: "ukuji",
    coinDecimals: 6,
    coinGeckoId: "kujira",
  },
  coinType: 118,
  chainIdentifier: "kujira",
  chainToAxelarChannelId: "channel-9",
  explorer: "https://www.mintscan.io/kujira/account/",
};
