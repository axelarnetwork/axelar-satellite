import { Bech32Address } from "@keplr-wallet/cosmos";
import { CosmosChain } from "../interface";

export default {
  chainId: "test-core-1",
  chainName: "Persistence Testnet",
  chainIdentifier: "persistence",
  rpc: "https://testnet-rpc-router.axelar-dev.workers.dev/?chain=persistence",
  rest: "https://rest.testnet.persistence.one",
  bip44: {
    coinType: 750,
  },
  bech32Config: Bech32Address.defaultBech32Config("persistence"),
  currencies: [
    {
      coinDenom: "XPRT",
      coinMinimalDenom: "uxprt",
      coinDecimals: 6,
      coinGeckoId: "persistence",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "XPRT",
      coinMinimalDenom: "uxprt",
      coinDecimals: 6,
      coinGeckoId: "persistence",
    },
  ],
  stakeCurrency: {
    coinDenom: "XPRT",
    coinMinimalDenom: "uxprt",
    coinDecimals: 6,
    coinGeckoId: "persistence",
  },
  coinType: 750,
  chainToAxelarChannelId: "channel-108",
} as CosmosChain;
