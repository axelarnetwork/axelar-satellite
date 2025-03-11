import { Bech32Address } from "@keplr-wallet/cosmos";

import { CosmosChain } from "../interface";

export const celestia: CosmosChain = {
  bech32Config: Bech32Address.defaultBech32Config("celestia"),
  bip44: {
    coinType: 118,
  },
  chainId: "celestia",
  chainName: "Celestia",
  chainIdentifier: "celestia",
  chainToAxelarChannelId: "channel-1",
  chainSymbolImageUrl:
    "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/celestia/chain.png",
  currencies: [
    {
      coinDecimals: 6,
      coinDenom: "TIA",
      coinGeckoId: "celestia",
      coinMinimalDenom: "utia",
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/celestia/chain.png",
    },
  ],
  features: ["ibc-transfer"],
  feeCurrencies: [
    {
      coinDecimals: 6,
      coinDenom: "TIA",
      coinGeckoId: "celestia",
      coinMinimalDenom: "utia",
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/celestia/chain.png",
      gasPriceStep: {
        low: 0.1,
        average: 0.2,
        high: 0.4,
      },
    },
  ],
  rpc: "https://rpc.celestia.nodestake.top",
  rest: "https://lcd-celestia.keplr.app",
  stakeCurrency: {
    coinDecimals: 6,
    coinDenom: "TIA",
    coinGeckoId: "celestia",
    coinMinimalDenom: "utia",
    coinImageUrl:
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/celestia/uatom.png",
  },
  walletUrlForStaking: "https://wallet.keplr.app/chains/celestia",
  explorer: "",
};
