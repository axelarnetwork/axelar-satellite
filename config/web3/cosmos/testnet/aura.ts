import { CosmosChain } from "../interface";

export default {
  chainId: "euphoria-1",
  chainName: "Aura Testnet",
  rpc: "https://testnet-rpc-router.axelar-dev.workers.dev/?chain=aura",
  rest: "https://lcd.euphoria.aura.network",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "aura",
    bech32PrefixAccPub: "aura" + "pub",
    bech32PrefixValAddr: "aura" + "valoper",
    bech32PrefixValPub: "aura" + "valoperpub",
    bech32PrefixConsAddr: "aura" + "valcons",
    bech32PrefixConsPub: "aura" + "valconspub",
  },
  currencies: [
    {
      coinDenom: "EAURA",
      coinMinimalDenom: "ueaura",
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "EAURA",
      coinMinimalDenom: "ueaura",
      coinDecimals: 6,
    },
  ],
  stakeCurrency: {
    coinDenom: "EAURA",
    coinMinimalDenom: "ueaura",
    coinDecimals: 6,
  },
  coinType: 118,
  gasPriceStep: {
    low: 0.001,
    average: 0.0025,
    high: 0.004,
  },
  features: ["no-legacy-stdTx"],
  walletUrlForStaking: "https://euphoria.aurascan.io/validators",
  logo: "https://i.imgur.com/zi0mTYb.png",
  explorer: "https://euphoria.aurascan.io/",
  chainIdentifier: "aura",
  chainToAxelarChannelId: "channel-5"
} as CosmosChain;