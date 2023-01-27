import { COSMOS_PROXY_RPC_MAINNET } from "../../../constants";
import { CosmosChain } from "../interface";

export default {
  rest: "https://lcd-osmosis.imperator.co",
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/osmosis`,
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
  explorer: "https://www.mintscan.io/osmosis/account/",
} as CosmosChain;
