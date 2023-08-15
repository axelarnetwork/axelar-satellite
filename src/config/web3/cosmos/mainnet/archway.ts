import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const archway: CosmosChain = {
  rest: "https://api.mainnet.archway.io",
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/archway`,
  bech32Config: Bech32Address.defaultBech32Config("archway"),
  bip44: {
    coinType: 118,
  },
  chainId: "archway-1",
  chainName: "Archway",
  chainSymbolImageUrl:
    "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/chain.png",
  currencies: [
    {
      coinDecimals: 18,
      coinDenom: "ARCH",
      coinGeckoId: "archway",
      coinMinimalDenom: "aarch",
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/aarch.png",
    },
  ],
  features: ["cosmwasm"],
  feeCurrencies: [
    {
      coinDecimals: 18,
      coinDenom: "ARCH",
      coinGeckoId: "archway",
      coinMinimalDenom: "aarch",
      gasPriceStep: {
        low: 1000000000000,
        average: 1500000000000,
        high: 2000000000000,
      },
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/aarch.png",
    },
  ],
  stakeCurrency: {
    coinDecimals: 18,
    coinDenom: "ARCH",
    coinGeckoId: "archway",
    coinMinimalDenom: "aarch",
    coinImageUrl:
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/aarch.png",
  },
  nodeProvider: {
    name: "Phi Labs",
    email: "support@philabs.xyz",
    website: "https://philabs.xyz",
  },
  walletUrlForStaking: "https://wallet.keplr.app/chains/archway",
  chainIdentifier: "archway",
  chainToAxelarChannelId: "channel-13",
  explorer: "https://www.mintscan.io/archway/account",
};
