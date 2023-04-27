import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const regen: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/regen`,
  rest: "https://rest-regen.ecostake.com",
  chainId: "regen-1",
  chainName: "Regen",
  stakeCurrency: {
    coinDenom: "REGEN",
    coinMinimalDenom: "uregen",
    coinDecimals: 6,
    coinGeckoId: "regen",
  },
  walletUrl: "https://wallet.keplr.app/chains/regen",
  walletUrlForStaking: "https://wallet.keplr.app/chains/regen",
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config("regen"),
  currencies: [
    {
      coinDenom: "REGEN",
      coinMinimalDenom: "uregen",
      coinDecimals: 6,
      coinGeckoId: "regen",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "REGEN",
      coinMinimalDenom: "uregen",
      coinDecimals: 6,
      coinGeckoId: "regen",
      gasPriceStep: {
        low: 0.015,
        average: 0.025,
        high: 0.04,
      },
    },
  ],
  features: ["ibc-go", "ibc-transfer"],
  chainIdentifier: "regen",
  chainToAxelarChannelId: "channel-48",
  explorer: "https://www.mintscan.io/regen/account/",
};
