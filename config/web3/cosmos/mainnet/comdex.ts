import { CosmosChain } from "../interface";

export default {
  rpc: "https://mainnet-rpc-router.axelar-dev.workers.dev/?chain=comdex",
  rest: "https://rest.comdex.one",
  chainId: "comdex-1",
  chainName: "Comdex Mainnet",
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
    low: 0.01,
    average: 0.03,
    high: 0.05,
  },
  features: ["stargate", "no-legacy-stdTx", "ibc-transfer"],
  chainToAxelarChannelId: "channel-34"
} as CosmosChain;
