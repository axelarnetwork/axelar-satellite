import { Bech32Address } from "@keplr-wallet/cosmos";
import { CosmosChain } from "../interface";

export default {
  rpc: "https://mainnet-rpc-router.axelar-dev.workers.dev/?chain=injective",
  rest: "https://lcd.injective.network",
  chainId: "injective-1",
  chainName: 'Injective',
  stakeCurrency: {
    coinDenom: 'INJ',
    coinMinimalDenom: 'inj',
    coinDecimals: 18,
    coinGeckoId: 'injective-protocol',
  },
  walletUrl: 'https://hub.injective.network/',
  walletUrlForStaking: 'https://hub.injective.network/',
  bip44: {
    coinType: 60,
  },
  bech32Config: Bech32Address.defaultBech32Config('inj'),
  currencies: [
    {
      coinDenom: 'INJ',
      coinMinimalDenom: 'inj',
      coinDecimals: 18,
      coinGeckoId: 'injective-protocol',
    }
  ],
  feeCurrencies: [
    {
      coinDenom: 'INJ',
      coinMinimalDenom: 'inj',
      coinDecimals: 18,
      coinGeckoId: 'injective-protocol',
    },
  ],
  gasPriceStep: {
    low: 5000000000,
    average: 25000000000,
    high: 40000000000,
  },
  features: ['ibc-transfer', 'ibc-go'],
  chainIdentifier: "injective",
  chainToAxelarChannelId: "channel-84"
} as CosmosChain;