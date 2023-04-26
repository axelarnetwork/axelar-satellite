import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const assetmantle: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/assetmantle`,
  rest: "https://rest.assetmantle.one",
  chainId: "mantle-1",
  chainName: "AssetMantle",
  stakeCurrency: {
    coinDenom: "MNTL",
    coinMinimalDenom: "umntl",
    coinDecimals: 6,
    coinGeckoId: "assetmantle",
  },
  bech32Config: {
    bech32PrefixAccAddr: "mantle",
    bech32PrefixAccPub: "mantlepub",
    bech32PrefixValAddr: "mantlevaloper",
    bech32PrefixValPub: "mantlevaloperpub",
    bech32PrefixConsAddr: "mantlevalcons",
    bech32PrefixConsPub: "mantlevalconspub",
  },
  bip44: {
    coinType: 118,
  },
  currencies: [
    {
      coinDenom: "MNTL",
      coinMinimalDenom: "umntl",
      coinDecimals: 6,
      coinGeckoId: "assetmantle",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "MNTL",
      coinMinimalDenom: "umntl",
      coinDecimals: 6,
      coinGeckoId: "assetmantle",
      gasPriceStep: {
        low: 0.05,
        average: 0.125,
        high: 0.2,
      },
    },
  ],
  features: ["stargate", "no-legacy-stdTx", "ibc-transfer"],
  chainIdentifier: "assetmantle",
  chainToAxelarChannelId: "channel-10",
  explorer: "https://explorer.assetmantle.one/wallet/",
};
