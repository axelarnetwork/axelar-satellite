import { Bech32Address } from "@keplr-wallet/cosmos";

export default {
    rpc: "https://axelar-testnet-rpc.axelar-dev.workers.dev",
    rest: "https://axelar-testnet-lcd.axelar-dev.workers.dev",
    chainId: "axelar-testnet-lisbon-3",
    chainName: "Axelar Lisbon 3",
    chainIdentifier: "axelar",
    stakeCurrency: {
      coinDenom: "AXL",
      coinMinimalDenom: "uaxl",
      coinDecimals: 6,
    },
    walletUrlForStaking: "https://www.testnet.keplr.app/#/axelar/stake",
    bech32Config: Bech32Address.defaultBech32Config("axelar"),
    bip44: {
      coinType: 118,
    },
    currencies: [{ coinDenom: "AXL", coinMinimalDenom: "uaxl", coinDecimals: 6 }],
    feeCurrencies: [
      { coinDenom: "AXL", coinMinimalDenom: "uaxl", coinDecimals: 6 },
    ],
    gasPriceStep: { low: 0.05, average: 0.125, high: 0.2 },
    features: ["ibc-transfer"],
  }