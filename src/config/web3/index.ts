import { AssetConfig } from "@axelar-network/axelarjs-sdk";
import { uniqBy } from "rambda";
import toast from "react-hot-toast";

import { Environment } from "~/utils/enums";

import { ENVIRONMENT } from "../constants";
import { CosmosChain } from "./cosmos/interface";
import { mainnetChains as cosmosMainnetChains } from "./cosmos/mainnet";
import { testnetChains as cosmosTestnetChains } from "./cosmos/testnet";
import { mainnetChains as evmMainnetChains } from "./evm/mainnet";
// wagmi ready chains
import { testnetChains as evmTestnetChains } from "./evm/testnet";

// sdk chains (generic)
// export const allAssets = loadAssets({
//   environment: ENVIRONMENT,
// });

// export const allChains = loadChains({
//   environment: ENVIRONMENT,
// });

export const getWagmiChains = () => {
  if (ENVIRONMENT === Environment.TESTNET) {
    return evmTestnetChains;
  }
  if (ENVIRONMENT === Environment.MAINNET) {
    return evmMainnetChains;
  }

  toast.error(`Environment "${ENVIRONMENT}" not supported`);

  return [];
};

export const getCosmosChains = (allAssets: AssetConfig[]) => {
  let chains: CosmosChain[] = [];
  if (ENVIRONMENT === Environment.TESTNET) {
    chains = cosmosTestnetChains;
  } else if (ENVIRONMENT === Environment.MAINNET) {
    chains = cosmosMainnetChains;
  } else {
    toast.error(`Environment "${ENVIRONMENT}" not supported`);
    return [];
  }

  chains = chains
    .map((cosmosChain) => {
      return {
        ...cosmosChain,
        currencies: [
          cosmosChain.currencies[0],
          ...allAssets
            .filter(
              (assetConfig) =>
                assetConfig.chain_aliases[cosmosChain.chainIdentifier] &&
                assetConfig.common_key[ENVIRONMENT] !==
                  cosmosChain?.currencies[0]?.coinMinimalDenom
            )
            .map((assetConfig) => {
              const asset =
                assetConfig.chain_aliases[cosmosChain.chainIdentifier];
              return {
                coinDenom: asset.assetSymbol as string,
                coinMinimalDenom: asset.ibcDenom as string,
                coinDecimals: assetConfig.decimals,
                coinGeckoId: asset.assetSymbol as string,
              };
            }),
        ],
      };
    })
    .map((chain) => {
      chain.currencies = uniqBy(
        (currency) => currency.coinDenom,
        chain.currencies
      );
      return chain;
    });

  return chains;
};
