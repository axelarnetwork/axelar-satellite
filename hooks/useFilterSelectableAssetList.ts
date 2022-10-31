import { useEffect } from "react";
import { AssetInfo } from "@axelar-network/axelarjs-sdk";
import { useSwapStore } from "../store";
import { ENVIRONMENT } from "../config/constants";
import { NativeAssetConfig } from "../config/nativeAssetList/testnet";

export function useFilterSelectableAssetList() {
  const { srcChain, destChain, setAssetList, setAsset, asset, allAssets } =
    useSwapStore((state) => state);

  useEffect(() => {
    if (srcChain && destChain) filterAssetList();
  }, [srcChain, destChain, asset]);

  function filterAssetList() {
    if (!srcChain || !destChain) return;
    const sourceAssets = srcChain.assets as AssetInfo[];
    const destAssets = destChain.assets as AssetInfo[];
    if (!sourceAssets || !destAssets) return;

    const selectableAssets = (allAssets as NativeAssetConfig[]).filter(
      (asset) => {
        const sourceHasAsset = sourceAssets.find(
          (_asset) => _asset.common_key === asset.common_key[ENVIRONMENT]
        );
        const destHasAsset = destAssets.find(
          (_asset) => _asset.common_key === asset.common_key[ENVIRONMENT]
        );

        // bypass filtering for native assets
        const assetIsNative =
          asset.is_native_asset &&
          srcChain.chainName.toLowerCase() === asset.native_chain;
        return (sourceHasAsset && destHasAsset) || assetIsNative;
      }
    );

    const selectableAssetsWithNative = selectableAssets.filter((_asset) => {
      if (!(_asset as any)?.is_native_asset) return true;
      if (_asset.native_chain !== srcChain.chainIdentifier[ENVIRONMENT])
        return false;
      return true;
    });

    setAssetList(selectableAssetsWithNative);
    const currentAssetValid = selectableAssets.find(
      (_asset) =>
        _asset.common_key[ENVIRONMENT] === asset?.common_key[ENVIRONMENT]
    );
    if (!currentAssetValid) {
      setAsset(null);
    }
  }
}
