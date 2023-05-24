import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const neutron: CosmosChain = {
  chainId: "neutron-1",
  chainIdentifier: "neutron",
  chainName: "Neutron",
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/neutron`,
  rest: "https://rest-kralum.neutron-1.neutron.org",
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
  chainToAxelarChannelId: "channel-2",
  explorer: "https://www.mintscan.io/neutron/account/",
};
