import { CosmosChain } from "../interface";

export default {
  rest: "https://emoney.validator.network/api",
  rpc: "https://mainnet-rpc-router.axelar-dev.workers.dev/?chain=e-money",
  chainId: "emoney-3",
  chainIdentifier: "e-money",
  currencies: [
    {
      coinDenom: "NGM",
      coinMinimalDenom: "ungm",
      coinDecimals: 6,
      coinGeckoId: "e-money",
    },
  ],
  chainToAxelarChannelId: "channel-26",
} as CosmosChain;
