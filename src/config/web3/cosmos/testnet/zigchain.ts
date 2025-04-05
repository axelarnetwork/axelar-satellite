import { CosmosChain } from "../interface";

export const zigchain: CosmosChain = {
  rpc: "https://testnet-rpc.zigchain.com",
  rest: "https://testnet-api.zigchain.com",
  chainId: "zig-test-1",
  chainName: "Zigchain",
  chainIdentifier: "zigchain",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "zig",
    bech32PrefixAccPub: "zigpub",
    bech32PrefixValAddr: "zigvaloper",
    bech32PrefixValPub: "zigvaloperpub",
    bech32PrefixConsAddr: "zigvalcons",
    bech32PrefixConsPub: "zigvalconspub",
  },
  currencies: [
    {
      coinDenom: "ZIG",
      coinMinimalDenom: "unit-zig",
      coinDecimals: 18
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "ZIG",
      coinMinimalDenom: "unit-zig",
      coinDecimals: 18,
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.03,
      },
    },
  ],
  stakeCurrency: {
    coinDecimals: 18,
    coinDenom: "ZIG",
    coinMinimalDenom: "unit-zig",
  },
  features: [],
  chainToAxelarChannelId: "channel-1",
  explorer: "",
};
