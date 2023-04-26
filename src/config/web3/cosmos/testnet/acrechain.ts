import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const acrechain: CosmosChain = {
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
      coinGeckoId: "arable-protocol",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "acre",
      coinMinimalDenom: "aacre",
      coinDecimals: 18,
      coinGeckoId: "arable-protocol",
      gasPriceStep: {
        low: 380000000000,
        average: 850000000000,
        high: 1000000000000,
      },
    },
  ],
  features: ["ibc-transfer", "ibc-go", "eth-address-gen", "eth-key-sign"],
  chainToAxelarChannelId: "channel-0",
  explorer: "https://acrescan.com/",
};
