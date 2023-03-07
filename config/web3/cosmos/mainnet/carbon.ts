import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "../../../constants";
import { CosmosChain } from "../interface";

export const carbon: CosmosChain = {
  chainId: "carbon-1",
  chainName: "Carbon",
  chainIdentifier: "carbon",
  chainToAxelarChannelId: "channel-69",
  rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/carbon`,
  rest: "https://api.carbon.network",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "swth",
    bech32PrefixAccPub: "swthpub",
    bech32PrefixValAddr: "swthvaloper",
    bech32PrefixValPub: "swthvaloperpub",
    bech32PrefixConsAddr: "swthvalcons",
    bech32PrefixConsPub: "swthvalconspub",
  },
  currencies: [
    {
      coinDenom: "SWTH",
      coinMinimalDenom: "swth",
      coinDecimals: 8,
      coinGeckoId: "switcheo",
    },
    {
      coinDenom: "BNB",
      coinMinimalDenom: "bnb.1.6.773edb",
      coinDecimals: 18,
      coinGeckoId: "binancecoin",
    },
    {
      coinDenom: "bNEO",
      coinMinimalDenom: "bneo.1.14.e2e5f6",
      coinDecimals: 8,
      coinGeckoId: "neo",
    },
    {
      coinDenom: "BUSD",
      coinMinimalDenom: "busd.1.6.754a80",
      coinDecimals: 18,
      coinGeckoId: "binance-usd",
    },
    {
      coinDenom: "ETH",
      coinMinimalDenom: "eth.1.19.c3b805",
      coinDecimals: 18,
      coinGeckoId: "ethereum",
    },
    {
      coinDenom: "ETH",
      coinMinimalDenom: "eth.1.2.942d87",
      coinDecimals: 18,
      coinGeckoId: "ethereum",
    },
    {
      coinDenom: "USC",
      coinMinimalDenom: "usc",
      coinDecimals: 6,
      coinGeckoId: "carbon-usd",
    },
    {
      coinDenom: "USDC",
      coinMinimalDenom: "usdc.1.2.343151",
      coinDecimals: 6,
      coinGeckoId: "usd-coin",
    },
    {
      coinDenom: "USDC",
      coinMinimalDenom: "usdc.1.6.53ff75",
      coinDecimals: 18,
      coinGeckoId: "usd-coin",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "SWTH",
      coinMinimalDenom: "swth",
      coinDecimals: 8,
      coinGeckoId: "switcheo",
    },
    {
      coinDenom: "BNB",
      coinMinimalDenom: "bnb.1.6.773edb",
      coinDecimals: 18,
      coinGeckoId: "binancecoin",
    },
    {
      coinDenom: "bNEO",
      coinMinimalDenom: "bneo.1.14.e2e5f6",
      coinDecimals: 8,
      coinGeckoId: "neo",
    },
    {
      coinDenom: "BUSD",
      coinMinimalDenom: "busd.1.6.754a80",
      coinDecimals: 18,
      coinGeckoId: "binance-usd",
    },
    {
      coinDenom: "ETH",
      coinMinimalDenom: "eth.1.19.c3b805",
      coinDecimals: 18,
      coinGeckoId: "ethereum",
    },
    {
      coinDenom: "ETH",
      coinMinimalDenom: "eth.1.2.942d87",
      coinDecimals: 18,
      coinGeckoId: "ethereum",
    },
    {
      coinDenom: "STARS",
      coinMinimalDenom:
        "ibc/07FA7831E1920D0C87C9388F86B0108677F6ED0C9DE7E4063F05ED675192405C",
      coinDecimals: 6,
      coinGeckoId: "stargaze",
    },
    {
      coinDenom: "LUNA",
      coinMinimalDenom:
        "ibc/2B58B8C147E8718EECCB3713271DF46DEE8A3A00A27242628604E31C2F370EF5",
      coinDecimals: 6,
      coinGeckoId: "terra-luna-2",
    },
    {
      coinDenom: "STRD",
      coinMinimalDenom:
        "ibc/3552CECB7BCE1891DB6070D37EC6E954C972B1400141308FCD85FD148BD06DE5",
      coinDecimals: 6,
      coinGeckoId: "stride",
    },
    {
      coinDenom: "KUJI",
      coinMinimalDenom:
        "ibc/662914D0C1CEBCB070C68F061D035E8B10A07C79AB286E7342C85F3BE74612C5",
      coinDecimals: 6,
      coinGeckoId: "kujira",
    },
    {
      coinDenom: "stOSMO",
      coinMinimalDenom:
        "ibc/75249A18DEFBEFE55F83B1C70CAD234DF164F174C6BC51682EE92C2C81C18C93",
      coinDecimals: 6,
      coinGeckoId: "osmosis",
    },
    {
      coinDenom: "CANTO",
      coinMinimalDenom:
        "ibc/92E974290AF9E2BC3AEEEC35305C8FD76AC5A22A74CF8D91270FDF5A1C41E861",
      coinDecimals: 18,
      coinGeckoId: "canto",
    },
    {
      coinDenom: "ATOM",
      coinMinimalDenom:
        "ibc/A4DB47A9D3CF9A068D454513891B526702455D3EF08FB9EB558C561F9DC2B701",
      coinDecimals: 6,
      coinGeckoId: "cosmos",
    },
    {
      coinDenom: "stATOM",
      coinMinimalDenom:
        "ibc/B7864B03E1B9FD4F049243E92ABD691586F682137037A9F3FCA5222815620B3C",
      coinDecimals: 6,
      coinGeckoId: "stride-staked-atom",
    },
    {
      coinDenom: "OSMO",
      coinMinimalDenom:
        "ibc/ED07A3391A112B175915CD8FAF43A2DA8E4790EDE12566649D0C2F97716B8518",
      coinDecimals: 6,
      coinGeckoId: "osmosis",
    },
    {
      coinDenom: "USC",
      coinMinimalDenom: "usc",
      coinDecimals: 6,
      coinGeckoId: "carbon-usd",
    },
    {
      coinDenom: "USDC",
      coinMinimalDenom: "usdc.1.2.343151",
      coinDecimals: 6,
      coinGeckoId: "usd-coin",
    },
    {
      coinDenom: "USDC",
      coinMinimalDenom: "usdc.1.6.53ff75",
      coinDecimals: 18,
      coinGeckoId: "usd-coin",
    },
  ],
  stakeCurrency: {
    coinDenom: "SWTH",
    coinMinimalDenom: "swth",
    coinDecimals: 8,
    coinGeckoId: "switcheo",
  },
  features: [],
  explorer: "https://www.mintscan.io/carbon/account/",
};
