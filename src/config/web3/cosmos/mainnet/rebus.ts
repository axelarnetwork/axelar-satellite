import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const rebus: CosmosChain = {
  rest: "https://api.rebuschain.com:1317",
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/rebus`,
  chainId: "reb_1111-1",
  chainIdentifier: "rebus",
  chainName: "Rebus",
  stakeCurrency: {
    coinDenom: "REBUS",
    coinMinimalDenom: "urebus",
    coinDecimals: 6,
  },
  bech32Config: Bech32Address.defaultBech32Config("rebus"),
  bip44: {
    coinType: 118,
  },
  feeCurrencies: [
    {
      coinDenom: "REBUS",
      coinMinimalDenom: "urebus",
      coinDecimals: 6,
    },
  ],
  currencies: [
    {
      coinDenom: "REBUS",
      coinMinimalDenom: "urebus",
      coinDecimals: 6,
    },
  ],
  chainToAxelarChannelId: "channel-9",
  explorer: "https://atomscan.com/rebus/",
};
