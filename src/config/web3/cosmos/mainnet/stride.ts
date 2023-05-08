import { Bech32Address } from "@keplr-wallet/cosmos";
import { getSigningStrideClientOptions, strideAccountParser } from "stridejs";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const stride: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/stride`,
  rest: "https://stride-fleet.main.stridenet.co/api",
  chainId: "stride-1",
  chainIdentifier: "stride",
  chainName: "Stride",
  stakeCurrency: {
    coinDenom: "STRD",
    coinMinimalDenom: "ustrd",
    coinDecimals: 6,
    coinGeckoId: "stride",
  },
  walletUrl: "https://wallet.keplr.app/chains/stride",
  walletUrlForStaking: "https://wallet.keplr.app/chains/stride",
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config("stride"),
  currencies: [
    {
      coinDenom: "STRD",
      coinMinimalDenom: "ustrd",
      coinDecimals: 6,
      coinGeckoId: "stride",
    },
    {
      coinDenom: "stATOM",
      coinMinimalDenom: "stuatom",
      coinDecimals: 6,
    },
    {
      coinDenom: "stOSMO",
      coinMinimalDenom: "stuosmo",
      coinDecimals: 6,
    },
    {
      coinDenom: "stJUNO",
      coinMinimalDenom: "stujuno",
      coinDecimals: 6,
    },
    {
      coinDenom: "stSTARS",
      coinMinimalDenom: "stustars",
      coinDecimals: 6,
    },
    {
      coinDenom: "stEVMOS",
      coinMinimalDenom: "staevmos",
      coinDecimals: 18,
    },
    {
      coinDenom: "stLUNA",
      coinMinimalDenom: "stuluna",
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "STRD",
      coinMinimalDenom: "ustrd",
      coinDecimals: 6,
      coinGeckoId: "stride",
      gasPriceStep: {
        low: 0,
        average: 0,
        high: 0.04,
      },
    },
  ],
  features: ["ibc-transfer"],
  chainToAxelarChannelId: "channel-69",
  explorer: "https://www.mintscan.io/stride/account/",
  signingClientOptions: {
    ...getSigningStrideClientOptions(),
    accountParser: strideAccountParser,
  },
};
