import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const evmos: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/evmos`,
  rest: "https://rest.bd.evmos.dev:1317",
  chainId: "evmos_9000-4",
  chainName: "Evmos Testnet",
  stakeCurrency: {
    coinDenom: "EVMOS",
    coinMinimalDenom: "atevmos",
    coinDecimals: 18,
    coinGeckoId: "evmos",
  },
  bech32Config: Bech32Address.defaultBech32Config("evmos"),
  bip44: {
    coinType: 118,
  },
  currencies: [
    {
      coinDenom: "EVMOS",
      coinMinimalDenom: "atevmos",
      coinDecimals: 18,
      coinGeckoId: "evmos",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "EVMOS",
      coinMinimalDenom: "atevmos",
      coinDecimals: 18,
      coinGeckoId: "evmos",
      gasPriceStep: {
        low: 25000000000,
        average: 25000000000,
        high: 40000000000,
      },
    },
  ],
  features: ["stargate", "no-legacy-stdTx", "ibc-transfer"],
  chainIdentifier: "evmos",
  chainToAxelarChannelId: "channel-22",
  explorer: "https://testnet.mintscan.io/evmos-testnet",
};
