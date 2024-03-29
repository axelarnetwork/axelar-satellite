import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const celestia: CosmosChain = {
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/celestia`,
  rest: "https://lcd-celestia-testnet-mocha.keplr.app",
  chainId: "mocha-4",
  chainIdentifier: "mocha-4",
  chainName: "Celestia Mocha Testnet",
  chainToAxelarChannelId: "channel-12",
  chainSymbolImageUrl:
    "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/mocha/chain.png",
  explorer: "",
  stakeCurrency: {
    coinDenom: "TIA",
    coinMinimalDenom: "utia",
    coinDecimals: 6,
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "celestia",
    bech32PrefixAccPub: "celestiapub",
    bech32PrefixValAddr: "celestiavaloper",
    bech32PrefixValPub: "celestiavaloperpub",
    bech32PrefixConsAddr: "celestiavalcons",
    bech32PrefixConsPub: "celestiavalconspub",
  },
  currencies: [
    {
      coinDenom: "TIA",
      coinMinimalDenom: "utia",
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "TIA",
      coinMinimalDenom: "utia",
      coinDecimals: 6,
      gasPriceStep: {
        low: 0.1,
        average: 0.25,
        high: 0.4,
      },
    },
  ],
  features: ["ibc-transfer"],
};
