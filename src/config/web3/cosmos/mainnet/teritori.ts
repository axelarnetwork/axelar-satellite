import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_MAINNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const teritori: CosmosChain = {
    rpc: `${COSMOS_PROXY_RPC_MAINNET}/chain/teritori`,
    rest: "https://rest.mainnet.teritori.com",
    chainId: "teritori-1",
    chainName: "teritori",
    stakeCurrency: {
        coinDenom: "TORI",
        coinMinimalDenom: "utori",
        coinDecimals: 6,
        coinGeckoId: "teritori",
    },
    walletUrl: "https://app.teritori.com/wallet-manager",
    walletUrlForStaking: "https://app.teritori.com/staking",
    bip44: {
        coinType: 118,
    },
    bech32Config: Bech32Address.defaultBech32Config("tori"),
    currencies: [
        {
            coinDenom: "TORI",
            coinMinimalDenom: "utori",
            coinDecimals: 6,
            coinGeckoId: "teritori",
        },
    ],
    feeCurrencies: [
        {
            coinDenom: "TORI",
            coinMinimalDenom: "utori",
            coinDecimals: 6,
            coinGeckoId: "teritori",
            gasPriceStep: {
                low: 0.00625,
                average: 0.025,
                high: 0.04
            },
        },
    ],
    features: ["ibc-transfer", "ibc-go", "stargate"],
    chainIdentifier: "teritori",
    chainToAxelarChannelId: "channel-61",
    explorer: "https://explorer.teritori.com/teritori",
};
