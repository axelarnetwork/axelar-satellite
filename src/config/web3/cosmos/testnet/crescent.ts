import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const crescent: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/crescent`,
  rest: "https://testnet-endpoint.crescent.network/api/crescent",
  chainId: "mooncat-1-1",
  chainName: "Crescent Testnet",
  chainIdentifier: "crescent",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "cre",
    bech32PrefixAccPub: "crepub",
    bech32PrefixValAddr: "crevaloper",
    bech32PrefixValPub: "crevaloperpub",
    bech32PrefixConsAddr: "crevalcons",
    bech32PrefixConsPub: "crevalconspub",
  },
  currencies: [
    {
      coinDenom: "CRE",
      coinMinimalDenom: "ucre",
      coinDecimals: 6,
      coinGeckoId: "crescent",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "CRE",
      coinMinimalDenom: "ucre",
      coinDecimals: 6,
      coinGeckoId: "crescent",
      gasPriceStep: {
        low: 1,
        average: 1,
        high: 1,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "CRE",
    coinMinimalDenom: "ucre",
    coinDecimals: 6,
    coinGeckoId: "crescent",
  },
  coinType: 118,
  features: ["ibc-transfer"],
  chainToAxelarChannelId: "channel-3",
  explorer: "https://testnet-explorer.crescent.network",
};
