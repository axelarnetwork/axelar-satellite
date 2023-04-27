import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const xpla: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/xpla`,
  rest: "https://dimension-lcd.xpla.dev",
  chainId: "dimension_37-1",
  chainName: "XPLA",
  chainIdentifier: "xpla",
  stakeCurrency: {
    coinDenom: "XPLA",
    coinMinimalDenom: "axpla",
    coinDecimals: 18,
    coinGeckoId: "xpla",
  },
  bech32Config: Bech32Address.defaultBech32Config("xpla"),
  bip44: { coinType: 60 },
  currencies: [
    {
      coinDenom: "XPLA",
      coinMinimalDenom: "axpla",
      coinDecimals: 18,
      coinGeckoId: "xpla",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "XPLA",
      coinMinimalDenom: "axpla",
      coinDecimals: 18,
      coinGeckoId: "xpla",
      gasPriceStep: {
        low: 380000000000,
        average: 850000000000,
        high: 1000000000000,
      },
    },
  ],
  coinType: 60,
  features: ["ibc-transfer", "ibc-go", "eth-address-gen", "eth-key-sign"],
  chainToAxelarChannelId: "channel-0",
  explorer: "",
};
