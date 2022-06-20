import { useEffect } from "react";
import { AssetConfig, AssetInfo } from "@axelar-network/axelarjs-sdk";

import { useSwapStore } from "../store";
import { allAssets } from "../config/assets";
import { ENVIRONMENT } from "../config/constants";

export function useFilterSelectableAssetList() {
  const { srcChain, destChain, setAssetList, setAsset, asset } = useSwapStore(
    (state) => state
  );

  useEffect(() => {
    if (srcChain && destChain) filterAssetList();
  }, [srcChain, destChain]);

  function filterAssetList() {
    const sourceAssets = srcChain.chainInfo.assets as AssetInfo[];
    const destAssets = destChain.chainInfo.assets as AssetInfo[];

    const selectableAssets = allAssets.filter((asset) => {
      const sourceHasAsset = sourceAssets.find(
        (_asset) => _asset.common_key === asset.common_key[ENVIRONMENT]
      );
      const destHasAsset = destAssets.find(
        (_asset) => _asset.common_key === asset.common_key[ENVIRONMENT]
      );
      return sourceHasAsset && destHasAsset;
    });

    setAssetList(selectableAssets);
    const currentAssetValid = selectableAssets.find(
      (_asset) =>
        _asset.common_key[ENVIRONMENT] !== asset?.common_key[ENVIRONMENT]
    );
    if (!currentAssetValid) {
      setAsset(null);
    }
  }
}
