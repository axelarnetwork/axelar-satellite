import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const terra: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/terra`,
  rest: "https://pisco-lcd.terra.dev",
  chainId: "pisco-1",
  chainName: "Terra Testnet",
  chainIdentifier: "terra",
  stakeCurrency: {
    coinDenom: "LUNA",
    coinMinimalDenom: "uluna",
    coinDecimals: 6,
  },
  bech32Config: Bech32Address.defaultBech32Config("terra"),
  bip44: { coinType: 330 },
  currencies: [
    { coinDenom: "LUNA", coinMinimalDenom: "uluna", coinDecimals: 6 },
  ],
  feeCurrencies: [
    {
      coinDenom: "LUNA",
      coinMinimalDenom: "uluna",
      coinDecimals: 6,
      coinGeckoId: "terra-luna-2",
      gasPriceStep: {
        low: 0.05,
        average: 0.125,
        high: 0.2,
      },
    },
  ],
  features: ["ibc-transfer"],
  chainToAxelarChannelId: "channel-22",
  explorer: "https://finder.terra.money/pisco-1",
};
