export default {
  chainId: "atlantic-1",
  chainName: "SEI Testnet",
  chainIdentifier: "sei",
  rpc: "https://testnet-rpc-router.axelar-dev.workers.dev/?chain=sei",
  rest: "https://sei-testnet-api.polkachu.com",
  bip44: { coinType: 118 },
  bech32Config: {
    bech32PrefixAccAddr: "sei",
    bech32PrefixAccPub: "seipub",
    bech32PrefixValAddr: "seivaloper",
    bech32PrefixValPub: "seivaloperpub",
    bech32PrefixConsAddr: "seivalcons",
    bech32PrefixConsPub: "seivalconspub",
  },
  currencies: [{ coinDenom: "SEI", coinMinimalDenom: "usei", coinDecimals: 6 }],
  feeCurrencies: [
    { coinDenom: "SEI", coinMinimalDenom: "usei", coinDecimals: 6 },
  ],
  stakeCurrency: {
    coinDenom: "SEI",
    coinMinimalDenom: "usei",
    coinDecimals: 6,
  },
  coinType: 118,
  chainToAxelarChannelId: "channel-29"
};
