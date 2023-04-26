import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const burnt: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/burnt`,
  rest: "https://api.carbon-2.burnt.com/9909089ac2fa57a8f5661976ad0bcb3f0629372e5afa131e2e29e737588e505f",
  chainId: "carbon-2",
  chainName: "Burnt Testnet",
  chainIdentifier: "burnt",
  stakeCurrency: {
    coinDenom: "TURNT",
    coinMinimalDenom: "uturnt",
    coinDecimals: 6,
    coinGeckoId: "burnt",
  },
  bech32Config: {
    bech32PrefixAccAddr: "burnt",
    bech32PrefixAccPub: "burntpub",
    bech32PrefixValAddr: "burntvaloper",
    bech32PrefixValPub: "burntvaloperpub",
    bech32PrefixConsAddr: "burntvalcons",
    bech32PrefixConsPub: "burntvalconspub",
  },
  bip44: { coinType: 118 },
  currencies: [
    {
      coinDenom: "TURNT",
      coinMinimalDenom: "uturnt",
      coinDecimals: 6,
      coinGeckoId: "turnt",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "TURNT",
      coinMinimalDenom: "uturnt",
      coinDecimals: 6,
      coinGeckoId: "turnt",
      gasPriceStep: {
        low: 0.25,
        average: 0.25,
        high: 0.4,
      },
    },
  ],
  features: ["stargate", "no-legacy-stdTx", "cosmwasm", "ibc-transfer"],
  chainToAxelarChannelId: "channel-1",
  explorer: "", // TODO: add explorer
};
