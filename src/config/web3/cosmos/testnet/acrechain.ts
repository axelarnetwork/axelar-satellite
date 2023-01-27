import { COSMOS_PROXY_RPC_TESTNET } from "../../../constants";
import { CosmosChain } from "../interface";

export default {
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/acrechain`,
  rest: "https://lcd-testnet2-acre.synergynodes.com",
  chainId: "bamboo_9051-2",
  chainName: "Acrechain Testnet",
  chainIdentifier: "acrechain",
  stakeCurrency: {
    coinDenom: "acre",
    coinMinimalDenom: "aacre",
    coinDecimals: 18,
    coinGeckoId: "unknown",
  },
  bech32Config: {
    bech32PrefixAccAddr: "acre",
    bech32PrefixAccPub: "acrepub",
    bech32PrefixValAddr: "acrevaloper",
    bech32PrefixValPub: "acrevaloperpub",
    bech32PrefixConsAddr: "acrevalcons",
    bech32PrefixConsPub: "acrevalconspub",
  },
  bip44: { coinType: 60 },
  currencies: [
    {
      coinDenom: "acre",
      coinMinimalDenom: "aacre",
      coinDecimals: 18,
      coinGeckoId: "unknown",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "acre",
      coinMinimalDenom: "aacre",
      coinDecimals: 18,
      coinGeckoId: "unknown",
    },
  ],
  gasPriceStep: {
    low: 0.01,
    average: 0.025,
    high: 0.03,
  },
  features: ["ibc-transfer", "ibc-go"],
  chainToAxelarChannelId: "channel-0",
} as CosmosChain;
