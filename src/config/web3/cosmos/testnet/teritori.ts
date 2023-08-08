import { Bech32Address } from "@keplr-wallet/cosmos";

import { COSMOS_PROXY_RPC_TESTNET } from "~/config/constants";

import { CosmosChain } from "../interface";

export const teritori: CosmosChain = {
    rpc: `${COSMOS_PROXY_RPC_TESTNET}/chain/teritori`,
    rest: "https://dapp-backend.testnet.teritori.com",
    chainId: "teritori-testnet-v3",
    chainName: "teritori-testnet",
    stakeCurrency: {
        coinDenom: "TORI",
        coinMinimalDenom: "utori",
        coinDecimals: 6,
        coinGeckoId: "teritori",
    },
    walletUrl: "https://app.teritori.com/wallet-manager",
    walletUrlForStaking: "https://restake.app/teritori",
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
    chainIdentifier: "teritori-testnet",
    chainToAxelarChannelId: "channel-294",
    explorer: "https://explorer.teritori.com/teritori",
};
