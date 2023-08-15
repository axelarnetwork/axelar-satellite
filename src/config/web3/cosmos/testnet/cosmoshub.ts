import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const cosmoshub: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/cosmoshub`,
  rest: "https://vega-rest.interchain.io",
  chainId: "vega-testnet",
  chainName: "Cosmoshub Testnet",
  chainIdentifier: "cosmoshub",
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config("cosmos"),
  currencies: [
    {
      coinDenom: "ATOM",
      coinMinimalDenom: "uatom",
      coinDecimals: 6,
      coinGeckoId: "cosmos",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "ATOM",
      coinMinimalDenom: "uatom",
      coinDecimals: 6,
      coinGeckoId: "cosmos",
    },
  ],
  stakeCurrency: {
    coinDenom: "ATOM",
    coinMinimalDenom: "uatom",
    coinDecimals: 6,
    coinGeckoId: "cosmos",
  },
  coinType: 118,
  features: ["ibc-transfer", "ibc-go"],
  chainToAxelarChannelId: "channel-238",
  explorer: "https://testnet.mintscan.io/cosmoshub-testnet",
};
