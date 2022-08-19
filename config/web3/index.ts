import {
  AssetConfig,
  loadAssets,
  loadChains,
} from "@axelar-network/axelarjs-sdk";
import toast from "react-hot-toast";
import { Environment } from "../../utils/enums";
import { ENVIRONMENT } from "../constants";

// wagmi ready chains
import { testnetChains as evmTestnetChains } from "./evm/chains.testnet";
import { testnetChains as cosmosTestnetChains } from "./cosmos/chains.testnet";

// sdk chains (generic)
// export const allAssets = loadAssets({
//   environment: ENVIRONMENT,
// });

// export const allChains = loadChains({
//   environment: ENVIRONMENT,
// });

export const getWagmiChains = () => {
  if (ENVIRONMENT === Environment.TESTNET) return evmTestnetChains;
  if (ENVIRONMENT === Environment.MAINNET) return [];

  toast.error(`Environment "${ENVIRONMENT}" not supported`);

  return [];
};

export const getCosmosChains = (allAssets: AssetConfig[]) => {
  if (ENVIRONMENT === Environment.TESTNET) {
    return cosmosTestnetChains.map((cosmosChain) => {
      return {
        ...cosmosChain,
        currencies: [
          cosmosChain.currencies[0],
          ...allAssets
            .filter(
              (assetConfig) =>
                assetConfig.chain_aliases[cosmosChain.chainIdentifier]
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
    });
  }
  if (ENVIRONMENT === Environment.MAINNET) return [];

  toast.error(`Environment "${ENVIRONMENT}" not supported`);

  return [];
};
