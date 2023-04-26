import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const secret: CosmosChain = {
  rest: "https://secret-4.api.trivium.network:1317",
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/secret`,
  chainId: "secret-4",
  chainName: "Secret",
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
  chainToAxelarChannelId: "channel-20",
  explorer: "https://www.mintscan.io/secret/account/",
};
