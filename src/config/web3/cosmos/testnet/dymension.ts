import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const dymension: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/dymension`,
  rest: "https://dymension-testnet-api.polkachu.com/",
  chainId: "blumbus_111-1",
  chainName: "Dymension Testnet",
  chainIdentifier: "dymension",
  features: ["eth-address-gen", "eth-key-sign"],
  currencies: [
    {
      coinMinimalDenom: "udym",
      coinDenom: "DYM",
      coinDecimals: 18,
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/froopyland_100/chain.png",
    },
  ],
  bip44: {
    coinType: 60,
  },
  bech32Config: {
    bech32PrefixAccAddr: "dym",
    bech32PrefixAccPub: "dympub",
    bech32PrefixValAddr: "dymvaloper",
    bech32PrefixValPub: "dymvaloperpub",
    bech32PrefixConsAddr: "dymvalcons",
    bech32PrefixConsPub: "dymvalconspub",
  },
  stakeCurrency: {
    coinMinimalDenom: "udym",
    coinDenom: "DYM",
    coinDecimals: 18,
    coinImageUrl:
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/froopyland_100/chain.png",
  },
  feeCurrencies: [
    {
      coinMinimalDenom: "udym",
      coinDenom: "DYM",
      coinDecimals: 18,
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/froopyland_100/chain.png",
      gasPriceStep: {
        average: 0.4,
        high: 0.55,
        low: 0.25,
      },
    },
  ],
  chainToAxelarChannelId: "channel-1",
  explorer: "https://explorer.silknodes.io/blumbus/account/",
};
