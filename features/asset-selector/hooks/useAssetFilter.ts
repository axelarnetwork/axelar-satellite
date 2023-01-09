import { useEffect } from "react";

import { assetIsCompatibleBetweenChains } from "features/asset-selector/utils";

import { useSwapStore } from "store";

import { AssetConfigExtended } from "types";

export const useAssetFilter = (
  input: string | undefined,
  setFilteredAssets: (value: AssetConfigExtended[]) => void
) => {
  const allAssets = useSwapStore((state) => state.allAssets);
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);

  useEffect(() => {
    let assets = allAssets.filter((asset) => {
      const assetMatchesSearch = asset.id
        .toLowerCase()
        ?.toLowerCase()
        .includes(input || "");

      // make sure asset is supported on src chain
      const assetIsSupportedByBothChains =
        asset.chain_aliases[srcChain?.chainName?.toLowerCase() || ""];

      // filter out native asset if source chain is not the asset's native chain
      if (asset.is_gas_token) {
        const showNativeAsset =
          srcChain.chainName?.toLowerCase() === asset.native_chain;
        return (
          assetMatchesSearch &&
          !!assetIsSupportedByBothChains &&
          showNativeAsset
        );
      }

      return assetMatchesSearch && !!assetIsSupportedByBothChains;
    });

    // sort assets based on their compatiblity with both chains
    assets.sort(
      (firstAsset, nextAsset) =>
        Number(assetIsCompatibleBetweenChains(nextAsset, srcChain, destChain)) -
        Number(assetIsCompatibleBetweenChains(firstAsset, srcChain, destChain))
    );

    setFilteredAssets(assets);
    // eslint-disable-next-line
  }, [allAssets, input, srcChain, destChain]);
};
