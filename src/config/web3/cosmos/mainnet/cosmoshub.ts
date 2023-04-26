import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const cosmoshub: CosmosChain = {
  rest: "https://api.cosmos.network",
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/cosmoshub`,
  chainId: "cosmoshub-4",
  chainIdentifier: "cosmoshub",
  chainName: "Cosmoshub",
  stakeCurrency: {
    coinDenom: "ATOM",
    coinMinimalDenom: "uatom",
    coinDecimals: 6,
  },
  bech32Config: Bech32Address.defaultBech32Config("cosmos"),
  bip44: {
    coinType: 118,
  },
  feeCurrencies: [
    {
      coinDenom: "ATOM",
      coinMinimalDenom: "uatom",
      coinDecimals: 6,
    },
  ],
  currencies: [
    {
      coinDenom: "ATOM",
      coinMinimalDenom: "uatom",
      coinDecimals: 6,
    },
  ],
  chainToAxelarChannelId: "channel-293",
  explorer: "https://www.mintscan.io/cosmoshub/account/",
};
