import { Bech32Address } from "@keplr-wallet/cosmos";
import { CosmosChain } from "../interface";

export default {
  rpc: "https://mainnet-rpc-router.axelar-dev.workers.dev/?chain=axelar",
  rest: "https://axelar-lcd.quickapi.com",
  chainId: "axelar-dojo-1",
  chainName: "Axelar",
  stakeCurrency: {
    coinDenom: "AXL",
    coinMinimalDenom: "uaxl",
    coinDecimals: 6,
  },
  bech32Config: Bech32Address.defaultBech32Config("axelar"),
  bip44: {
    coinType: 118,
  },
  currencies: [{ coinDenom: "AXL", coinMinimalDenom: "uaxl", coinDecimals: 6 }],
  feeCurrencies: [
    { coinDenom: "AXL", coinMinimalDenom: "uaxl", coinDecimals: 6 },
  ],
  gasPriceStep: { low: 0.05, average: 0.125, high: 0.2 },
  features: ["stargate", "no-legacy-stdTx", "ibc-transfer"],
  chainIdentifier: "axelar",
  chainToAxelarChannelId: "channel-0",
} as CosmosChain;
