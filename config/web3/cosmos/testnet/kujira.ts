import { CosmosChain } from "../interface";

export default {
  chainId: "harpoon-4",
  chainName: "Kujira Testnet",
  chainIdentifier: "kujira",
  rpc: "https://testnet-rpc-router.axelar-dev.workers.dev/?chain=kujira",
  rest: "https://lcd-harpoon.kujira.app",
  bip44: { coinType: 118 },
  bech32Config: {
    bech32PrefixAccAddr: "kujira",
    bech32PrefixAccPub: "kujirapub",
    bech32PrefixValAddr: "kujiravaloper",
    bech32PrefixValPub: "kujiravaloperpub",
    bech32PrefixConsAddr: "kujiravalcons",
    bech32PrefixConsPub: "kujiravalconspub",
  },
  currencies: [
    {
      coinDenom: "KUJI",
      coinMinimalDenom: "ukuji",
      coinDecimals: 6,
      coinGeckoId: "kujira",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "KUJI",
      coinMinimalDenom: "ukuji",
      coinDecimals: 6,
      coinGeckoId: "kujira",
    },
  ],
  stakeCurrency: {
    coinDenom: "KUJI",
    coinMinimalDenom: "ukuji",
    coinDecimals: 6,
    coinGeckoId: "kujira",
  },
  coinType: 118,
  gasPriceStep: { low: 0.01, average: 0.025, high: 0.03 },
  chainToAxelarChannelId: "channel-8"
} as CosmosChain;
