import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const terraClassic: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/terra-classic`,
  rest: "https://api-terra-ia.cosmosia.notional.ventures",
  chainId: "columbus-5",
  chainName: "Terra Classic",
  stakeCurrency: {
    coinDenom: "LUNA",
    coinMinimalDenom: "uluna",
    coinDecimals: 6,
    coinGeckoId: "terra-luna",
  },
  chainIdentifier: "terra classic",
  bip44: {
    coinType: 330,
  },
  bech32Config: Bech32Address.defaultBech32Config("terra"),
  currencies: [
    {
      coinDenom: "LUNA",
      coinMinimalDenom: "uluna",
      coinDecimals: 6,
      coinGeckoId: "terra-luna",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "LUNA",
      coinMinimalDenom: "uluna",
      coinDecimals: 6,
      coinGeckoId: "terra-luna",
      gasPriceStep: {
        low: 5.665,
        average: 5.665,
        high: 7,
      },
    },
  ],
  features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
  explorer: "https://finder.terra.money/mainnet/address/",
  chainToAxelarChannelId: "channel-19",
};
