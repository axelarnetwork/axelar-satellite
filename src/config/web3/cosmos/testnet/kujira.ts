import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const kujira: CosmosChain = {
  chainId: "harpoon-4",
  chainName: "Kujira Testnet",
  chainIdentifier: "kujira",
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/kujira`,
  rest: "https://lcd-harpoon.kujira.app",
  bip44: { coinType: 118 },
  bech32Config: Bech32Address.defaultBech32Config("kujira"),
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
  chainToAxelarChannelId: "channel-8",
  explorer: "", // TODO add explorer
};
