import { Bech32Address } from "@keplr-wallet/cosmos";
import { COSMOS_PROXY_RPC_TESTNET } from "../../../constants";
import { CosmosChain } from "../interface";

export default {
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/burnt`,
  rest: "https://api.carbon-2.burnt.com/9909089ac2fa57a8f5661976ad0bcb3f0629372e5afa131e2e29e737588e505f",
  chainId: "carbon-2",
  chainName: "Burnt Testnet",
  chainIdentifier: "burnt",
  stakeCurrency: {
    coinDenom: "BURNT",
    coinMinimalDenom: "burnt",
    coinDecimals: 18,
  },
  bech32Config: Bech32Address.defaultBech32Config("burnt"),
  bip44: { coinType: 330 },
  currencies: [
    { coinDenom: "BURNT", coinMinimalDenom: "burnt", coinDecimals: 18 },
  ],
  feeCurrencies: [
    {
      coinDenom: "BURNT",
      coinMinimalDenom: "burn",
      coinDecimals: 18,
    },
  ],
  gasPriceStep: { low: 0.05, average: 0.125, high: 0.2 },
  features: ["ibc-transfer"],
  chainToAxelarChannelId: "channel-1",
} as CosmosChain;
