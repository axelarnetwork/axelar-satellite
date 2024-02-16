import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const chihuahua: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/chihuahua`,
  rest: "https://lcd-mainnet-chihuahua.synergynodes.com",
  chainId: "chihuahua-1",
  chainName: "Chihuahua v1.2",
  chainIdentifier: "chihuahua",
  stakeCurrency: {
    coinDenom: "HUAHUA",
    coinMinimalDenom: "uhuahua",
    coinDecimals: 6,
    coinGeckoId: "chihuahua-token",
  },
  bech32Config: Bech32Address.defaultBech32Config("chihuahua"),
  bip44: { coinType: 60 },
  currencies: [
    {
      coinDenom: "HUAHUA",
      coinMinimalDenom: "uhuahua",
      coinDecimals: 6,
      coinGeckoId: "chihuahua-token",
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/chihuahua/chain.png",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "HUAHUAS",
      coinMinimalDenom: "uhuahua",
      coinDecimals: 6,
      coinGeckoId: "chihuahua-token",
      gasPriceStep: {
        low: 0.05,
        average: 0.125,
        high: 0.2,
      },
    },
  ],
  features: ["cosmwasm"],
  chainToAxelarChannelId: "channel-0",
  explorer: "https://www.mintscan.io/chihuahua/account/",
};
