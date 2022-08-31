import { CosmosChain } from "../interface";

export default {
  rest: "https://osmosis-1--lcd--full.datahub.figment.io/apikey/6d8baa3d3e97e427db4bd7ffcfb21be4",
  rpc: "https://osmosis-1--rpc--full.datahub.figment.io/apikey/6d8baa3d3e97e427db4bd7ffcfb21be4",
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
