import { COSMOS_PROXY_RPC_TESTNET } from "../../../constants";
import { CosmosChain } from "../interface";

export default {
  chainId: "atlantic-1",
  chainName: "Sei Testnet",
  chainIdentifier: "sei",
  rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/sei`,
  rest: "https://sei-testnet-api.polkachu.com",
  bip44: { coinType: 118 },
  bech32Config: {
    bech32PrefixAccAddr: "sei",
    bech32PrefixAccPub: "seipub",
    bech32PrefixValAddr: "seivaloper",
    bech32PrefixValPub: "seivaloperpub",
    bech32PrefixConsAddr: "seivalcons",
    bech32PrefixConsPub: "seivalconspub",
  },
  currencies: [{ coinDenom: "SEI", coinMinimalDenom: "usei", coinDecimals: 6 }],
  feeCurrencies: [
    { coinDenom: "SEI", coinMinimalDenom: "usei", coinDecimals: 6 },
  ],
  stakeCurrency: {
    coinDenom: "SEI",
    coinMinimalDenom: "usei",
    coinDecimals: 6,
  },
  coinType: 118,
  chainToAxelarChannelId: "channel-29",
} as CosmosChain;
