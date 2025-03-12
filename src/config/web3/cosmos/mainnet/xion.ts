import { CosmosChain } from "../interface";

export const xion: CosmosChain = {
  rpc: "https://rpc.xion-mainnet-1.burnt.com:443",
  rest: "https://api.xion-mainnet-1.burnt.com",
  chainId: "xion-mainnet-1",
  chainName: "Xion",
  chainIdentifier: "xion",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "xion",
    bech32PrefixAccPub: "xionpub",
    bech32PrefixValAddr: "xionvaloper",
    bech32PrefixValPub: "xionvaloperpub",
    bech32PrefixConsAddr: "xionvalcons",
    bech32PrefixConsPub: "xionvalconspub",
  },
  currencies: [
    {
      coinDenom: "XION",
      coinMinimalDenom: "uxion",
      coinDecimals: 6,
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/refs/heads/main/images/elys/xion-mainnet/chain.png",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "XION",
      coinMinimalDenom: "uxion",
      coinDecimals: 6,
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/refs/heads/main/images/xion-mainnet/chain.png",
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.03,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "XION",
    coinMinimalDenom: "uxion",
    coinDecimals: 6,
    coinImageUrl:
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/refs/heads/main/images/xion-mainnet/chain.png",
  },
  features: [],
  chainToAxelarChannelId: "channel-3",
  explorer: "", // No explorer provided in the new config
};
