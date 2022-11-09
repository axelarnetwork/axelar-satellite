import { CosmosChain } from "../interface";

export default {
  rest: "https://api.cosmos.network",
  rpc: "https://mainnet-rpc-router.axelar-dev.workers.dev?chain=cosmoshub",
  chainId: "cosmoshub-4",
  chainIdentifier: "cosmoshub",
  currencies: [
    { coinDenom: "ATOM", coinMinimalDenom: "uatom", coinDecimals: 6 },
  ],
  chainToAxelarChannelId: "channel-293",
} as CosmosChain;
