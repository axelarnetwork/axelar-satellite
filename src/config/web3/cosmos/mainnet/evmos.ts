import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const evmos: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/evmos`,
  rest: "https://lcd-evmos.imperator.co", //"https://mainnet-lcd-router.axelar-dev.workers.dev", TODO - get LCD router to work so that we can retry
  chainId: "evmos_9001-2",
  chainName: "Evmos",
  stakeCurrency: {
    coinDenom: "EVMOS",
    coinMinimalDenom: "aevmos",
    coinDecimals: 18,
    coinGeckoId: "evmos",
  },
  walletUrl: "https://wallet.keplr.app/chains/evmos",
  walletUrlForStaking: "https://wallet.keplr.app/chains/evmos",
  bip44: {
    coinType: 60,
  },
  bech32Config: Bech32Address.defaultBech32Config("evmos"),
  currencies: [
    {
      coinDenom: "EVMOS",
      coinMinimalDenom: "aevmos",
      coinDecimals: 18,
      coinGeckoId: "evmos",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "EVMOS",
      coinMinimalDenom: "aevmos",
      coinDecimals: 18,
      coinGeckoId: "evmos",
      gasPriceStep: {
        low: 25000000000,
        average: 25000000000,
        high: 40000000000,
      },
    },
  ],
  features: ["ibc-transfer", "ibc-go", "eth-address-gen", "eth-key-sign"],
  beta: true,
  chainIdentifier: "evmos",
  chainToAxelarChannelId: "channel-21",
  explorer: "https://www.mintscan.io/evmos/account/",
};
