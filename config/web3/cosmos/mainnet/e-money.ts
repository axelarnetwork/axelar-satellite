import { COSMOS_PROXY_RPC_MAINNET } from "../../../constants";
import { CosmosChain } from "../interface";

export default {
  rest: "https://emoney.validator.network/api",
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/e-money`,
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
