import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "../../../constants";
import { CosmosChain } from "../interface";

export const acrechain: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/acrechain`,
  rest: "https://lcd-acre.synergynodes.com",
  chainId: "acre_9052-1",
  chainName: "Acrechain",
  chainIdentifier: "acrechain",
  stakeCurrency: {
    coinDenom: "ACRE",
    coinMinimalDenom: "aacre",
    coinDecimals: 18,
    coinGeckoId: "arable-protocol",
  },
  bech32Config: Bech32Address.defaultBech32Config("acre"),
  bip44: { coinType: 60 },
  currencies: [
    {
      coinDenom: "ACRE",
      coinMinimalDenom: "aacre",
      coinDecimals: 18,
      coinGeckoId: "arable-protocol",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "ACRE",
      coinMinimalDenom: "aacre",
      coinDecimals: 18,
      coinGeckoId: "arable-protocol",
    },
  ],
  gasPriceStep: {
    low: 380000000000,
    average: 850000000000,
    high: 1000000000000,
  },
  features: ["ibc-transfer", "ibc-go", "eth-address-gen", "eth-key-sign"],
  chainToAxelarChannelId: "channel-5",
  explorer: "https://acrescan.com/",
};
