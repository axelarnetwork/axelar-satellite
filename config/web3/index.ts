import toast from "react-hot-toast";
import { AssetConfig } from "@axelar-network/axelarjs-sdk";
import { Environment } from "../../utils/enums";
import { ENVIRONMENT } from "../constants";

// wagmi ready chains
import { testnetChains as evmTestnetChains } from "./evm/testnet";
import { mainnetChains as evmMainnetChains } from "./evm/mainnet";
import { testnetChains as cosmosTestnetChains } from "./cosmos/testnet";
import { mainnetChains as cosmosMainnetChains } from "./cosmos/mainnet";
import { CosmosChain } from "./cosmos/interface";
import { nativeAssets as testnetNativeAssets } from "./evm/testnet/native-assets";
import { nativeAssets as mainnetNativeAssets } from "./evm/mainnet/native-assets";

// sdk chains (generic)
// export const allAssets = loadAssets({
//   environment: ENVIRONMENT,
// });

// export const allChains = loadChains({
//   environment: ENVIRONMENT,
// });

const nativeDenoms = (ENVIRONMENT === "mainnet" ? mainnetNativeAssets : testnetNativeAssets).map((asset) => asset.common_key[ENVIRONMENT]);

export const getWagmiChains = () => {
  if (ENVIRONMENT === Environment.TESTNET) return evmTestnetChains;
  if (ENVIRONMENT === Environment.MAINNET) return evmMainnetChains;

  toast.error(`Environment "${ENVIRONMENT}" not supported`);

  return [];
};

export const getCosmosChains = (allAssets: AssetConfig[]) => {
  let chains: CosmosChain[] = [];
  if (ENVIRONMENT === Environment.TESTNET) chains = cosmosTestnetChains;
  else if (ENVIRONMENT === Environment.MAINNET) chains = cosmosMainnetChains;
  else {
    toast.error(`Environment "${ENVIRONMENT}" not supported`);
    return [];
  }

  return chains.map((cosmosChain) => {
    return {
      ...cosmosChain,
      currencies: [
        cosmosChain.currencies[0],
        ...allAssets
          .filter(
            (asset) => !nativeDenoms.includes(asset.common_key[ENVIRONMENT])
          )
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
  });
};
