import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const comdex: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/comdex`,
  rest: "https://test2-rest.comdex.one",
  chainId: "comdex-test2",
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
      gasPriceStep: {
        low: 0.01,
        average: 0.03,
        high: 0.05,
      },
    },
  ],
  features: ["stargate", "no-legacy-stdTx", "ibc-transfer"],
  chainToAxelarChannelId: "channel-2",
  explorer: "https://test2-explorer.comdex.one/wallet/",
};
