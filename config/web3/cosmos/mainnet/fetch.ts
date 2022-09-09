export default {
  rpc: "https://mainnet-rpc-router.axelar-dev.workers.dev/?chain=fetch",
  rest: "https://rest-fetchhub.fetch.ai:443",
  chainId: "fetchhub-4",
  chainName: "FetchHub",
  stakeCurrency: {
    coinDenom: "FET",
    coinMinimalDenom: "afet",
    coinDecimals: 18,
    coinGeckoId: "fetch-ai",
  },
  bech32Config: {
    bech32PrefixAccAddr: "fetch",
    bech32PrefixAccPub: "fetchpub",
    bech32PrefixValAddr: "fetchvaloper",
    bech32PrefixValPub: "fetchvaloperpub",
    bech32PrefixConsAddr: "fetchvalcons",
    bech32PrefixConsPub: "fetchvalconspub",
  },
  bip44: {
    coinType: 118,
  },
  currencies: [
    {
      coinDenom: "FET",
      coinMinimalDenom: "afet",
      coinDecimals: 18,
      coinGeckoId: "fetch-ai",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "FET",
      coinMinimalDenom: "afet",
      coinDecimals: 18,
      coinGeckoId: "fetch-ai",
    },
  ],
  gasPriceStep: { low: 0.05, average: 0.125, high: 0.2 },
  features: ["stargate", "no-legacy-stdTx", "ibc-transfer"],
};
