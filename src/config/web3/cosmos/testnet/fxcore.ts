import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const fxcore: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/fxcore`,
  rest: "https://testnet-fx-rest.functionx.io",
  chainId: "dhobyghaut",
  chainName: "f(x)Core Testnet",
  chainIdentifier: "fxcore",
  walletUrl: "https://testnet.starscan.io/fxcore/validators",
  walletUrlForStaking: "https://testnet.starscan.io/fxcore/validators",
  stakeCurrency: {
    coinDenom: "FX",
    coinMinimalDenom: "FX",
    coinDecimals: 18,
    coinGeckoId: "fx-coin",
    coinImageUrl:
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/fxcore/fx.png",
  },
  bech32Config: Bech32Address.defaultBech32Config("fxcore"),
  bip44: { coinType: 60 },
  currencies: [
    {
      coinDenom: "FX",
      coinMinimalDenom: "FX",
      coinDecimals: 18,
      coinGeckoId: "fx-coin",
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/fxcore/fx.png",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "FX",
      coinMinimalDenom: "FX",
      coinDecimals: 18,
      coinGeckoId: "fx-coin",
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/fxcore/fx.png",
      gasPriceStep: {
        low: 0.000004,
        average: 0.000004,
        high: 0.0000041,
      },
    },
  ],
  features: ["eth-address-gen", "eth-key-sign", "ibc-transfer"],
  beta: true,
  chainToAxelarChannelId: "channel-127",
  explorer: "https://testnet.fxcore.network",
};
