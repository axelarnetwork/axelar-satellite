import { Bech32Address } from "@keplr-wallet/cosmos";
import { CosmosChain } from "../interface";

export default {
  rpc: "https://mainnet-rpc-router.axelar-dev.workers.dev/?chain=comdex",
  rest: "https://rest.comdex.one",
  chainId: "comdex-1",
  chainName: "Comdex",
  chainIdentifier: "comdex",
  stakeCurrency: {
    coinDenom: "CMDX",
    coinMinimalDenom: "ucmdx",
    coinDecimals: 6,
    coinGeckoId: "cmdx",
  },
  bech32Config: Bech32Address.defaultBech32Config("comdex"),
  bip44: {
    coinType: 118,
  },
  currencies: [
    {
      coinDenom: "CMDX",
      coinMinimalDenom: "ucmdx",
      coinDecimals: 6,
      coinGeckoId: "comdex",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "CMDX",
      coinMinimalDenom: "ucmdx",
      coinDecimals: 6,
      coinGeckoId: "comdex",
    },
  ],
  gasPriceStep: {
    low: 0.01,
    average: 0.03,
    high: 0.05,
  },
  features: ["stargate", "no-legacy-stdTx", "ibc-transfer"],
  chainToAxelarChannelId: "channel-34"
} as CosmosChain;
