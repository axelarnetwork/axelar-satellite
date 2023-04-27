import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const secret: CosmosChain = {
  rest: "http://testnet.securesecrets.org:1317",
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/secret`,
  chainId: "secret-snip-2",
  chainName: "Secret Testnet",
  chainIdentifier: "secret",
  currencies: [
    {
      coinDenom: "SCRT",
      coinMinimalDenom: "uscrt",
      coinDecimals: 6,
      coinGeckoId: "secret",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "SCRT",
      coinMinimalDenom: "uscrt",
      coinDecimals: 6,
      coinGeckoId: "secret",
    },
  ],
  stakeCurrency: {
    coinDenom: "SCRT",
    coinMinimalDenom: "uscrt",
    coinDecimals: 6,
    coinGeckoId: "secret",
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config("secret"),
  chainToAxelarChannelId: "channel-182",
  explorer: "https://www.mintscan.io/secret/account/",
};
