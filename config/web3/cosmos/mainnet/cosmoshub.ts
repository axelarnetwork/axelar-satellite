import { COSMOS_PROXY_RPC_MAINNET } from "../../../constants";
import { CosmosChain } from "../interface";

export default {
  rest: "https://api.cosmos.network",
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/cosmoshub`,
  chainId: "cosmoshub-4",
  chainIdentifier: "cosmoshub",
  currencies: [
    { coinDenom: "ATOM", coinMinimalDenom: "uatom", coinDecimals: 6 },
  ],
  chainToAxelarChannelId: "channel-293",
} as CosmosChain;
