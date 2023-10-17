import { Bech32Address } from "@keplr-wallet/cosmos";

import { CosmosChain } from "../interface";

export const burnt: CosmosChain = {
  rpc: `https://rpc.xion-testnet-1.burnt.com:443`,
  rest: "https://api.xion-testnet-1.burnt.com",
  chainId: "xion-testnet-1",
  chainName: "Burnt Testnet",
  chainIdentifier: "burnt",
  bech32Config: Bech32Address.defaultBech32Config("xion"),
  bip44: { coinType: 118 },
  currencies: [
    {
      coinDenom: "XION",
      coinMinimalDenom: "uxion",
      coinDecimals: 6,
      coinGeckoId: "xion",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "XION",
      coinMinimalDenom: "uxion",
      coinDecimals: 6,
      coinGeckoId: "xion",
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.03,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "XION",
    coinMinimalDenom: "uxion",
    coinDecimals: 6,
    coinGeckoId: "xion",
  },
  features: ["ibc-go", "ibc-transfer", "no-legacy-stdTx"],
  chainToAxelarChannelId: "channel-5",
  explorer: "", // TODO: add explorer
};
