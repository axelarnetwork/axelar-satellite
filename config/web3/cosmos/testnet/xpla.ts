import { Bech32Address } from "@keplr-wallet/cosmos";
import { COSMOS_PROXY_RPC_TESTNET } from "../../../constants";
import { CosmosChain } from "../interface";

export default {
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/xpla`,
  rest: "https://cube-lcd.xpla.dev",
  chainId: "cube_47-5",
  chainName: "XPLA Testnet",
  chainIdentifier: "xpla",
  stakeCurrency: {
    coinDenom: "XPLA",
    coinMinimalDenom: "axpla",
    coinDecimals: 18,
    coinGeckoId: "xpla",
  },
  bech32Config: Bech32Address.defaultBech32Config("xpla"),
  bip44: { coinType: 60 },
  currencies: [
    {
      coinDenom: "XPLA",
      coinMinimalDenom: "axpla",
      coinDecimals: 18,
      coinGeckoId: "xpla",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "XPLA",
      coinMinimalDenom: "axpla",
      coinDecimals: 18,
      coinGeckoId: "xpla",
    },
  ],
  coinType: 60,
  gasPriceStep: {
    low: 380000000000,
    average: 850000000000,
    high: 1000000000000,
  },
  features: ["ibc-transfer", "ibc-go"],
  chainToAxelarChannelId: "channel-0",
} as CosmosChain;
