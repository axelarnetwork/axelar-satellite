import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const neutron: CosmosChain = {
  chainId: "pion-1",
  chainIdentifier: "neutron",
  chainName: "Neutron-Pion",
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/neutron`,
  rest: "https://cosmo-sand-box.vercel.app/api/rest",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "neutron",
    bech32PrefixAccPub: "neutronpub",
    bech32PrefixValAddr: "neutronvaloper",
    bech32PrefixValPub: "neutronvaloperpub",
    bech32PrefixConsAddr: "neutronvalcons",
    bech32PrefixConsPub: "neutronvalconspub",
  },
  currencies: [
    {
      coinDenom: "NTRN",
      coinMinimalDenom: "untrn",
      coinDecimals: 6,
      coinGeckoId: "ntrn",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "NTRN",
      coinMinimalDenom: "untrn",
      coinDecimals: 6,
      coinGeckoId: "ntrn",
    },
  ],
  stakeCurrency: {
    coinDenom: "NTRN",
    coinMinimalDenom: "untrn",
    coinDecimals: 6,
    coinGeckoId: "ntrn",
  },
  coinType: 118,
  features: ["stargate", "ibc-transfer", "cosmwasm"],
  beta: true,
  chainToAxelarChannelId: "channel-237",
  explorer: "https://testnet.mintscan.io/neutron/account/",
};
