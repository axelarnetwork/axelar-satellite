import { CosmosChain } from "../interface";

export default {
  rest: "https://osmosis-api.polkachu.com",
  rpc: "https://osmosis-rpc.polkachu.com",
  chainId: "osmosis-1",
  chainToAxelarChannelId: "channel-208",
  currencies: [
    {
      coinDenom: "OSMO",
      coinMinimalDenom: "uosmo",
      coinDecimals: 6,
      coinGeckoId: "osmosis",
    },
  ],
  chainIdentifier: "osmosis",
} as CosmosChain;
