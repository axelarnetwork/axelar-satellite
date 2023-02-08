import { COSMOS_PROXY_RPC_MAINNET } from "../../../constants";
import { CosmosChain } from "../interface";

export default {
  rest: "https://secret-4.api.trivium.network:1317",
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/secret`,
  chainId: "secret-4",
  chainIdentifier: "secret",
  currencies: [
    {
      coinDenom: "SCRT",
      coinMinimalDenom: "uscrt",
      coinDecimals: 6,
      coinGeckoId: "secret",
    },
  ],
  chainToAxelarChannelId: "channel-20",
  explorer: "https://www.mintscan.io/secret/account/",
} as CosmosChain;
