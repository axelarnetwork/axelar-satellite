import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const axelar: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/axelar`,
  rest: "https://axelar-testnet-lcd.axelar-dev.workers.dev",
  chainId: "axelar-testnet-lisbon-3",
  chainName: "Axelar Testnet",
  chainIdentifier: "axelar",
  stakeCurrency: {
    coinDenom: "AXL",
    coinMinimalDenom: "uaxl",
    coinDecimals: 6,
  },
  walletUrlForStaking: "https://www.testnet.keplr.app/#/axelar/stake",
  bech32Config: Bech32Address.defaultBech32Config("axelar"),
  bip44: {
    coinType: 118,
  },
  currencies: [
    {
      coinDenom: "AXL",
      coinMinimalDenom: "uaxl",
      coinDecimals: 6,
      coinGeckoId: "AXL",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "AXL",
      coinMinimalDenom: "uaxl",
      coinDecimals: 6,
      gasPriceStep: {
        low: 0.007,
        average: 0.007,
        high: 0.01,
      },
    },
  ],
  features: ["ibc-transfer"],
  chainToAxelarChannelId: "",
  explorer: "https://axelarscan.io/",
};
