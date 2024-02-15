import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const elys: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/elys`,
  rest: "https://api.testnet.elys.network",
  chainId: "elystestnet-1",
  chainName: "Elys",
  chainIdentifier: "elys",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "elys",
    bech32PrefixAccPub: "elyspub",
    bech32PrefixValAddr: "elysvaloper",
    bech32PrefixValPub: "elysvaloperpub",
    bech32PrefixConsAddr: "elysvalcons",
    bech32PrefixConsPub: "elysvalconspub",
  },
  currencies: [
    {
      coinDenom: "ELYS",
      coinMinimalDenom: "uelys",
      coinDecimals: 6,
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/elystestnet/chain.png",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "ELYS",
      coinMinimalDenom: "uelys",
      coinDecimals: 6,
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.03,
      },
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/elystestnet/chain.png",
    },
  ],
  stakeCurrency: {
    coinDenom: "ELYS",
    coinMinimalDenom: "uelys",
    coinDecimals: 6,
    coinImageUrl:
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/elystestnet/chain.png",
  },
  features: [],
  chainToAxelarChannelId: "channel-15",
  explorer: "https://explorer.nodestake.org/elys-testnet/account/",
};
