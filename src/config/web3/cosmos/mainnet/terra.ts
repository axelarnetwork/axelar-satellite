import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const terra: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/terra`,
  rest: "https://phoenix-lcd.terra.dev",
  chainId: "phoenix-1",
  chainName: "Terra",
  stakeCurrency: {
    coinDenom: "LUNA",
    coinMinimalDenom: "uluna",
    coinDecimals: 6,
    coinGeckoId: "terra-luna-2",
  },
  chainIdentifier: "terra",
  bip44: {
    coinType: 330,
  },
  bech32Config: Bech32Address.defaultBech32Config("terra"),
  currencies: [
    {
      coinDenom: "LUNA",
      coinMinimalDenom: "uluna",
      coinDecimals: 6,
      coinGeckoId: "terra-luna-2",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "LUNA",
      coinMinimalDenom: "uluna",
      coinDecimals: 6,
      coinGeckoId: "terra-luna-2",
      gasPriceStep: {
        low: 5.665,
        average: 5.665,
        high: 7,
      },
    },
  ],
  features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
  explorer: "https://finder.terra.money/mainnet/address/",
  chainToAxelarChannelId: "channel-6",
};
