import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const nibiru: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/nibiru`,
  rest: "https://lcd.testnet-1.nibiru.fi",
  chainId: "nibiru-testnet-1",
  chainName: "Nibiru",
  chainIdentifier: "nibiru",
  bech32Config: Bech32Address.defaultBech32Config("nibi"),
  bip44: {
    coinType: 118,
  },
  currencies: [
    {
      coinDenom: "NIBI",
      coinMinimalDenom: "unibi",
      coinDecimals: 6,
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nibiru-itn/chain.png",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "NIBI",
      coinMinimalDenom: "unibi",
      coinDecimals: 6,
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nibiru-itn/chain.png",
      gasPriceStep: {
        low: 0.05,
        average: 0.125,
        high: 0.2,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "NIBI",
    coinMinimalDenom: "unibi",
    coinDecimals: 6,
    coinImageUrl:
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/nibiru-itn/chain.png",
  },
  features: ["cosmwasm"],
  chainToAxelarChannelId: "channel-1",
  explorer: "https://explorer.nibiru.fi/nibiru-testnet-1/account/",
};
