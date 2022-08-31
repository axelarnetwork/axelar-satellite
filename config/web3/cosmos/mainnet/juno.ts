import { CosmosChain } from "../interface";

export default {
  rest: "https://lcd-juno.itastakers.com",
  rpc: "https://mainnet-rpc-router.axelar-dev.workers.dev/?chain=juno",
  chainId: "juno-1",
  chainToAxelarChannelId: "channel-71",
  currencies: [
    {
      coinDenom: "JUNO",
      coinMinimalDenom: "ujuno",
      coinDecimals: 6,
      coinGeckoId: "juno-network",
    },
  ],
  chainIdentifier: "juno",
} as CosmosChain;
