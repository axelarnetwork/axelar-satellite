import { Bech32Address } from "@keplr-wallet/cosmos";

import { CosmosChain } from "../interface";

export const burnt: CosmosChain = {
  rpc: `https://rpc.xion-testnet-1.burnt.com`,
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
    {
      coinDenom: "AXL",
      coinMinimalDenom:
        "ibc/D934516FBE457F3A98AFABD87E0EFF7F95A15325C191EA8CDD7763C702FDDEC2",
      coinDecimals: 6,
      coinGeckoId: "axelar",
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
