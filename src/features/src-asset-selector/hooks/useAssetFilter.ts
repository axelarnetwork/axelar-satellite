import { useMemo } from "react";

import { useAssetCompatibilityBetweenChains } from "~/features/src-asset-selector/utils";

import { useSquidStateStore, useSwapStore } from "~/store";

export const useAssetFilter = (input: string | undefined) => {
  const { squidTokens } = useSquidStateStore();

  const allAssets = useSwapStore((state) => state.allAssets);
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);

  const { checkCompatibility } = useAssetCompatibilityBetweenChains(
    srcChain,
    destChain
  );

  return useMemo(() => {
    return allAssets
      .filter((asset) => {
        const assetMatchesSearch = asset.id
          .toLowerCase()
          ?.toLowerCase()
          .includes(input || "");

        const [isCompatible] = checkCompatibility(asset);

        // make sure asset is supported on src chain
        const assetIsSupportedByBothChains =
          srcChain?.chainName?.toLowerCase() in asset.chain_aliases ||
          isCompatible;

        // filter out native asset if source chain is not the asset's native chain
        if (asset.is_gas_token) {
          const showNativeAsset =
            srcChain.chainName?.toLowerCase() === asset.native_chain;
          return (
            assetMatchesSearch &&
            assetIsSupportedByBothChains &&
            showNativeAsset
          );
        }

        return assetMatchesSearch && assetIsSupportedByBothChains;
      })
      .sort((firstAsset, nextAsset) => {
        const [isNextAssetSupportedOnBothChains] =
          checkCompatibility(nextAsset);

        const [isFirstAssetSupportedOnBothChains] =
          checkCompatibility(firstAsset);

        return (
          Number(isNextAssetSupportedOnBothChains) -
          Number(isFirstAssetSupportedOnBothChains)
        );
      });
  }, [allAssets, input, checkCompatibility, srcChain.chainName]);
};
