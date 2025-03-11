import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const elys: CosmosChain = {
  rpc: "https://rpc.elys.network",
  rest: "https://api.elys.network",
  chainId: "elys-1",
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
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/refs/heads/main/images/elys/chain.png",
    },
    {
      coinDenom: "XION",
      coinMinimalDenom: "uxion",
      coinDecimals: 6,
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/refs/heads/main/images/xion-mainnet/chain.png",
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
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/refs/heads/main/images/elys/chain.png",
    },
  ],
  stakeCurrency: {
    coinDenom: "ELYS",
    coinMinimalDenom: "uelys",
    coinDecimals: 6,
    coinImageUrl:
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/refs/heads/main/images/elys/chain.png",
  },
  features: [],
  chainToAxelarChannelId: "channel-3",
  explorer: "https://explorer.nodestake.org/elys/account/",
};
