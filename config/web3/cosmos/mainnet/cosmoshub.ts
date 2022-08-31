import { CosmosChain } from "../interface";

export default {
  rest: "https://api.cosmos.network",
  rpc: "https://cosmoshub-4--rpc--full.datahub.figment.io/apikey/6d8baa3d3e97e427db4bd7ffcfb21be4",
  chainId: "cosmoshub-4",
  chainIdentifier: "cosmoshub",
  currencies: [{ coinDenom: "ATOM", coinMinimalDenom: "uatom", coinDecimals: 6 }],
  chainToAxelarChannelId: "channel-293"
} as CosmosChain;