import { CosmosChain } from "../interface";

export default {
  rpc: "https://testnet-rpc-router.axelar-dev.workers.dev/?chain=comdex",
  rest: "https://meteor.rest.comdex.one",
  chainId: "meteor-test",
  chainName: "Comdex Testnet",
  chainIdentifier: "comdex",
  stakeCurrency: {
    coinDenom: "CMDX",
    coinMinimalDenom: "ucmdx",
    coinDecimals: 6,
    coinGeckoId: "cmdx",
  },
  bech32Config: {
    bech32PrefixAccAddr: "comdex",
    bech32PrefixAccPub: "comdexpub",
    bech32PrefixValAddr: "comdexvaloper",
    bech32PrefixValPub: "comdexvaloperpub",
    bech32PrefixConsAddr: "comdexvalcons",
    bech32PrefixConsPub: "comdexvalconspub",
  },
  bip44: {
    coinType: 118,
  },
  currencies: [
    {
      coinDenom: "CMDX",
      coinMinimalDenom: "ucmdx",
      coinDecimals: 6,
      coinGeckoId: "comdex",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "CMDX",
      coinMinimalDenom: "ucmdx",
      coinDecimals: 6,
      coinGeckoId: "comdex",
    },
  ],
  gasPriceStep: {
    low: 0.001,
    average: 0.0025,
    high: 0.004,
  },
  features: ["stargate", "no-legacy-stdTx", "ibc-transfer"],
  chainToAxelarChannelId: "channel-18"
} as CosmosChain;
