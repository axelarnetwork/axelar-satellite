import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const saga: CosmosChain = {
  chainId: "ssc-testnet-1",
  chainName: "Saga",
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/saga`,
  rest: "https://testnet-ssc.sagarpc.io",
  chainIdentifier: "saga",
  chainToAxelarChannelId: "channel-9",
  explorer: "https://testnet-scan.sagalink.io/address/",
  stakeCurrency: {
    coinDenom: "TSAGA",
    coinMinimalDenom: "utsaga",
    coinDecimals: 6,
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "saga",
    bech32PrefixAccPub: "sagapub",
    bech32PrefixValAddr: "sagavaloper",
    bech32PrefixValPub: "sagavaloperpub",
    bech32PrefixConsAddr: "sagavalcons",
    bech32PrefixConsPub: "sagavalconspub",
  },
  currencies: [
    {
      coinDenom: "TSAGA",
      coinMinimalDenom: "utsaga",
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "TSAGA",
      coinMinimalDenom: "utsaga",
      coinDecimals: 6,
      gasPriceStep: {
        low: 0,
        average: 0,
        high: 0,
      },
    },
  ],
};
