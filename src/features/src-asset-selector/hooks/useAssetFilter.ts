import { useMemo } from "react";

import { useAssetCompatibilityBetweenChains } from "~/features/src-asset-selector/utils";

import { useSwapStore } from "~/store";

export const useAssetFilter = (input: string | undefined) => {
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
        const assetMatchesSearch = asset.id.toLowerCase().includes(input || "");

        // make sure asset is supported on src chain
        const assetIsSupportedByBothChains =
          srcChain?.chainName?.toLowerCase() in asset.chain_aliases;

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
      .map((asset) => {
        const [isCompatible, reason] = checkCompatibility(asset);
        return {
          ...asset,
          isCompatible,
          incompatibilityReason: reason,
        };
      })
      .sort((a, b) => {
        if (a.isCompatible && !b.isCompatible) {
          return -1;
        }
        if (!a.isCompatible && b.isCompatible) {
          return 1;
        }
        return 0;
      });
  }, [allAssets, input, srcChain.chainName, checkCompatibility]);
};
