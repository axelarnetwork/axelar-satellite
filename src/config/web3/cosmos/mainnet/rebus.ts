import { Bech32Address } from "@keplr-wallet/cosmos";

import { CosmosChain } from "../interface";

export const rebus: CosmosChain = {
  rest: "https://api.rebuschain.com:1317",
  rpc: `https://api.rebuschain.com:26657`,
  chainId: "reb_1111-1",
  chainIdentifier: "rebus",
  chainName: "Rebus",
  bech32Config: Bech32Address.defaultBech32Config("rebus"),
  bip44: {
    coinType: 60,
  },
  feeCurrencies: [
    {
      coinDenom: "REBUS",
      coinMinimalDenom: "arebus",
      coinDecimals: 18,
      coinGeckoId: "rebus",
      coinImageUrl:
        "https://app.rebuschain.com/public/assets/main/rebus-logo-single.svg",
      gasPriceStep: {
        low: 5000000000,
        average: 15000000000,
        high: 25000000000,
      },
    },
  ],
  currencies: [
    {
      coinDenom: "REBUS",
      coinMinimalDenom: "arebus",
      coinDecimals: 18,
      coinGeckoId: "rebus",
      coinImageUrl:
        "https://app.rebuschain.com/public/assets/main/rebus-logo-single.svg",
    },
    {
      coinDenom: "LUDUS",
      coinMinimalDenom: "uludus",
      coinDecimals: 6,
      coinGeckoId: "ludus",
      coinImageUrl: "https://app.rebuschain.com/public/assets/tokens/ludus.png",
    },
    {
      coinDenom: "OSMO",
      coinMinimalDenom:
        "ibc/ED07A3391A112B175915CD8FAF43A2DA8E4790EDE12566649D0C2F97716B8518",
      coinDecimals: 6,
      coinGeckoId: "osmosis",
      coinImageUrl: "https://app.rebuschain.com/public/assets/tokens/osmo.svg",
    },
  ],
  stakeCurrency: {
    coinDenom: "REBUS",
    coinMinimalDenom: "arebus",
    coinDecimals: 18,
    coinGeckoId: "rebus",
    coinImageUrl:
      "https://app.rebuschain.com/public/assets/main/rebus-logo-single.svg",
  },
  features: [
    "stargate",
    "ibc-transfer",
    "no-legacy-stdTx",
    "ibc-go",
    "eth-address-gen",
    "eth-key-sign",
  ],
  chainToAxelarChannelId: "channel-9",
  explorer: "https://atomscan.com/rebus/",
  walletUrlForStaking: "https://app.rebuschain.com/staking",
  coinType: 60,
  beta: true,
};
