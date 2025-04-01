import { CosmosChain } from "../interface";

export const elys: CosmosChain = {
  rpc: "https://rpc.mantrachain.io",
  rest: "https://api.mantrachain.io",
  chainId: "mantra-1",
  chainName: "Mantra",
  chainIdentifier: "mantra",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "mantra",
    bech32PrefixAccPub: "mantrapub",
    bech32PrefixValAddr: "mantravaloper",
    bech32PrefixValPub: "mantravaloperpub",
    bech32PrefixConsAddr: "mantravalcons",
    bech32PrefixConsPub: "mantravalconspub",
  },
  currencies: [
    {
      coinDenom: "OM",
      coinMinimalDenom: "uom",
      coinDecimals: 6,
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/refs/heads/main/images/mantra/om.png",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "OM",
      coinMinimalDenom: "uom",
      coinDecimals: 6,
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.03,
      },
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/refs/heads/main/images/mantra/om.png",
    },
  ],
  stakeCurrency: {
    coinDenom: "OM",
    coinMinimalDenom: "uom",
    coinDecimals: 6,
    coinImageUrl:
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/refs/heads/main/images/mantra/om.png",
  },
  features: [],
  chainToAxelarChannelId: "channel-6",
  explorer: "https://explorer.nodestake.org/mantra/account/",
};