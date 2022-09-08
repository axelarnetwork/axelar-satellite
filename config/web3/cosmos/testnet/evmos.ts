import { Bech32Address } from "@keplr-wallet/cosmos";
import { CosmosChain } from "../interface";

export default   {
    rpc: "https://testnet-rpc-router.axelar-dev.workers.dev/?chain=evmos",
    rest: "https://rest.bd.evmos.org:1317",
    chainId: "evmos_9001-2",
    chainName: "Evmos",
    stakeCurrency: {
      coinDenom: "EVMOS",
      coinMinimalDenom: "aevmos",
      coinDecimals: 18,
      coinGeckoId: "evmos",
    },
    walletUrl:
      process.env.NODE_ENV === "production"
        ? "https://wallet.keplr.app/chains/evmos"
        : "http://localhost:8080/chains/evmos",
    walletUrlForStaking:
      process.env.NODE_ENV === "production"
        ? "https://wallet.keplr.app/chains/evmos"
        : "http://localhost:8080/chains/evmos",
    bip44: {
      coinType: 60,
    },
    bech32Config: Bech32Address.defaultBech32Config("evmos"),
    currencies: [
      {
        coinDenom: "EVMOS",
        coinMinimalDenom: "aevmos",
        coinDecimals: 18,
        coinGeckoId: "evmos",
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "EVMOS",
        coinMinimalDenom: "aevmos",
        coinDecimals: 18,
        coinGeckoId: "evmos",
      },
    ],
    gasPriceStep: {
      low: 25000000000,
      average: 25000000000,
      high: 40000000000,
    },
    features: ["ibc-transfer", "ibc-go", "eth-address-gen", "eth-key-sign"],
    beta: true,
    chainIdentifier: "evmos",
    chainToAxelarChannelId: "channel-22"
  } as CosmosChain;