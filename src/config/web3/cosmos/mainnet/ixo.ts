import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const ixo: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/ixo`,
  rest: "https://lcd-ixo.keplr.app",
  chainId: "ixo-5",
  chainName: "ixo",
  chainSymbolImageUrl:
    "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/ixo/chain.png",
  stakeCurrency: {
    coinDenom: "IXO",
    coinMinimalDenom: "uixo",
    coinDecimals: 6,
    coinGeckoId: "ixo",
    coinImageUrl:
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/ixo/uixo.png",
  },
  walletUrl: "https://wallet.keplr.app/chains/ixo",
  walletUrlForStaking: "https://wallet.keplr.app/chains/ixo",
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config("ixo"),
  currencies: [
    {
      coinDenom: "IXO",
      coinMinimalDenom: "uixo",
      coinDecimals: 6,
      coinGeckoId: "ixo",
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/ixo/uixo.png",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "IXO",
      coinMinimalDenom: "uixo",
      coinDecimals: 6,
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/ixo/uixo.png",
      gasPriceStep: {
        low: 0.015,
        average: 0.025,
        high: 0.04,
      },
    },
  ],
  features: [],
  chainIdentifier: "ixo",
  chainToAxelarChannelId: "channel-23",
  explorer: "https://www.mintscan.io/ixo/account",
};
