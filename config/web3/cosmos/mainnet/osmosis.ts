import { CosmosChain } from "../interface";

export default {
  rest: "https://lcd-osmosis.imperator.co",
  rpc: "https://rpc-osmosis.imperator.co",
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
