import { Bech32Address } from "@keplr-wallet/cosmos";

import { CosmosChain } from "../interface";

export const warden: CosmosChain = {
  rpc: "https://rpc.buenavista.wardenprotocol.org/",
  rest: "https://api.buenavista.wardenprotocol.org/",
  chainId: "buenavista-1",
  chainName: "Warden Protocol Buenavista Testnet",
  chainIdentifier: "buenavista-1",
  bech32Config: Bech32Address.defaultBech32Config("warden"),
  bip44: {
    coinType: 118,
  },
  currencies: [
    {
      coinDecimals: 6,
      coinDenom: "WARD",
      coinMinimalDenom: "uward",
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/alfama/uward.png",
    },
  ],
  feeCurrencies: [
    {
      coinDecimals: 6,
      coinDenom: "WARD",
      coinMinimalDenom: "uward",
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/alfama/uward.png",
      gasPriceStep: {
        average: 0.025,
        high: 0.03,
        low: 0.005,
      },
    },
  ],
  stakeCurrency: {
    coinDecimals: 6,
    coinDenom: "WARD",
    coinMinimalDenom: "uward",
    coinImageUrl:
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/alfama/uward.png",
  },
  features: [
    "stargate",
    "ibc-transfer",
    "cosmwasm",
    "no-legacy-stdTx",
    "ibc-go",
  ],
  chainToAxelarChannelId: "channel-1",
  explorer: "", // TODO: add explorer
};
