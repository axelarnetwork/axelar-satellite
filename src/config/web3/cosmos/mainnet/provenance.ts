import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const provenance: CosmosChain = {
  chainId: "pio-mainnet-1",
  chainName: "Provenance",
  chainIdentifier: "provenance",
  chainToAxelarChannelId: "channel-9",
  rest: "https://api.provenance.io/",
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/provenance`,
  bech32Config: Bech32Address.defaultBech32Config("pb"),
  bip44: {
    coinType: 505,
  },
  chainSymbolImageUrl:
    "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/pio-mainnet/chain.png",
  currencies: [
    {
      coinDecimals: 9,
      coinDenom: "HASH",
      coinGeckoId: "provenance-blockchain",
      coinMinimalDenom: "nhash",
    },
  ],
  features: ["cosmwasm"],
  feeCurrencies: [
    {
      coinDecimals: 9,
      coinDenom: "HASH",
      coinGeckoId: "provenance-blockchain",
      coinMinimalDenom: "nhash",
      gasPriceStep: {
        average: 1905,
        high: 2500,
        low: 1905,
      },
    },
  ],
  nodeProvider: {
    name: "Provenance",
    email: "inbound@provenance.io",
    website: "https://provenance.io",
  },
  stakeCurrency: {
    coinDecimals: 9,
    coinDenom: "HASH",
    coinGeckoId: "provenance-blockchain",
    coinMinimalDenom: "nhash",
  },
  explorer: "https://explorer.provenance.io/accounts/",
};
