import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const provenance: CosmosChain = {
  bech32Config: Bech32Address.defaultBech32Config("tp"),
  bip44: {
    coinType: 1,
  },
  chainId: "pio-testnet-1",
  chainIdentifier: "provenance",
  chainToAxelarChannelId: "channel-75",
  chainName: "Provenance Testnet",
  chainSymbolImageUrl:
    "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/pio-testnet/chain.png",
  currencies: [
    {
      coinDecimals: 9,
      coinDenom: "HASH",
      coinGeckoId: "provenance-blockchain",
      coinMinimalDenom: "nhash",
    },
  ],
  explorer: "",
  features: ["cosmwasm"],
  feeCurrencies: [
    {
      coinDecimals: 9,
      coinDenom: "HASH",
      coinGeckoId: "provenance-blockchain",
      coinMinimalDenom: "nhash",
      gasPriceStep: {
        average: 19050,
        high: 25000,
        low: 19050,
      },
    },
  ],
  nodeProvider: {
    name: "Provenance",
    email: "inbound@provenance.io",
    website: "https://test.provenance.io",
  },
  rest: "https://api.test.provenance.io/",
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/provenance`,
  stakeCurrency: {
    coinDecimals: 9,
    coinDenom: "HASH",
    coinGeckoId: "provenance-blockchain",
    coinMinimalDenom: "nhash",
  },
};
