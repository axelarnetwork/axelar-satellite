import { Bech32Address } from "@keplr-wallet/cosmos";
import { CosmosChain } from "../interface";

export default {
  rpc: "https://mainnet-rpc-router.axelar-dev.workers.dev/?chain=stargaze",
  rest: "https://rest.stargaze-apis.com",
  chainId: "stargaze-1",
  chainName: "Stargaze",
  stakeCurrency: {
    coinDenom: "STARS",
    coinMinimalDenom: "ustars",
    coinDecimals: 6,
    coinGeckoId: "stargaze",
  },
  walletUrl: "https://wallet.keplr.app/chains/stargaze",
  walletUrlForStaking: "https://wallet.keplr.app/chains/stargaze",
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config("stars"),
  currencies: [
    {
      coinDenom: "STARS",
      coinMinimalDenom: "ustars",
      coinDecimals: 6,
      coinGeckoId: "stargaze",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "STARS",
      coinMinimalDenom: "ustars",
      coinDecimals: 6,
      coinGeckoId: "stargaze",
    },
  ],
  features: ["ibc-transfer", "ibc-go"],
  chainIdentifier: "stargaze",
  chainToAxelarChannelId: "channel-50"
} as CosmosChain;
