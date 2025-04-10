import { CosmosChain } from "../interface";

export const babylon: CosmosChain = {
  rpc: "https://babylon.nodes.guru/rpc",
  rest: "https://babylon.nodes.guru/api",
  chainId: "bbn-1",
  chainName: "Babylon Genesis",
  chainIdentifier: "babylon",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "bbn",
    bech32PrefixAccPub: "bbnpub",
    bech32PrefixValAddr: "bbnvaloper",
    bech32PrefixValPub: "bbnvaloperpub",
    bech32PrefixConsAddr: "bbnvalcons",
    bech32PrefixConsPub: "bbnvalconspub",
  },
  currencies: [
    {
      coinDenom: "BABY",
      coinMinimalDenom: "ubbn",
      coinDecimals: 6,
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/refs/heads/main/images/bbn-test/chain.png",
    },
    {
        coinDenom: "LBTC",
        coinMinimalDenom: "ibc/89EE10FCF78800B572BAAC7080AEFA301B5F3BBC51C5371E907EB129C5B900E7",
        coinDecimals: 8,
        coinImageUrl:
          "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/bbn-test/LBTC.png",
      }
  ],
  feeCurrencies: [
    {
      coinDenom: "BABY",
      coinMinimalDenom: "ubbn",
      coinDecimals: 6,
      gasPriceStep: {
        low: 0.007,
        average: 0.007,
        high: 0.01,
      },
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/refs/heads/main/images/bbn-test/chain.png",
    },
  ],
  stakeCurrency: {
    coinDenom: "BABY",
    coinMinimalDenom: "ubbn",
    coinDecimals: 6,
    coinImageUrl:
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/refs/heads/main/images/bbn-test/chain.png",
  },
  features: [],
  chainToAxelarChannelId: "channel-2",
  explorer: "", // not provided 
};