import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const aura: CosmosChain = {
  chainId: "xstaxy-1",
  chainName: "Aura",
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/aura`,
  rest: "https://lcd.aura.network",
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config("aura"),
  currencies: [
    {
      coinDenom: "AURA",
      coinMinimalDenom: "uaura",
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "AURA",
      coinMinimalDenom: "uaura",
      coinDecimals: 6,
      gasPriceStep: {
        low: 0.001,
        average: 0.0025,
        high: 0.004,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "AURA",
    coinMinimalDenom: "uaura",
    coinDecimals: 6,
  },
  coinType: 118,
  features: ["no-legacy-stdTx"],
  explorer: "https://aurascan.io/",
  chainIdentifier: "aura",
  walletUrlForStaking: "https://aurascan.io/validators",
  chainToAxelarChannelId: "channel-4",
};
