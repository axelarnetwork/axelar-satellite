import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const sei: CosmosChain = {
  chainId: "pacific-1",
  chainName: "Sei",
  chainIdentifier: "sei",
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/sei`,
  rest: "https://sei-api.polkachu.com",
  bip44: { coinType: 118 },
  bech32Config: {
    bech32PrefixAccAddr: "sei",
    bech32PrefixAccPub: "seipub",
    bech32PrefixValAddr: "seivaloper",
    bech32PrefixValPub: "seivaloperpub",
    bech32PrefixConsAddr: "seivalcons",
    bech32PrefixConsPub: "seivalconspub",
  },
  currencies: [{ coinDenom: "SEI", coinMinimalDenom: "usei", coinDecimals: 6 }],
  feeCurrencies: [
    { coinDenom: "SEI", coinMinimalDenom: "usei", coinDecimals: 6 },
  ],
  stakeCurrency: {
    coinDenom: "SEI",
    coinMinimalDenom: "usei",
    coinDecimals: 6,
  },
  coinType: 118,
  chainToAxelarChannelId: "channel-2",
  explorer: "", // TODO: add explorer
};
