import React from "react";
import { getUnwrappedAssetName, useSwapStore } from "../../../store";
import { SwapStatus } from "../../../utils/enums";

export const UnwrapToNativeChainCheckbox = () => {
  const unwrappedAssetName = useSwapStore(getUnwrappedAssetName);
  const { shouldUnwrapAsset, setShouldUnwrapAsset, swapStatus } = useSwapStore(
    (state) => state
  );

  if (!unwrappedAssetName) return null;
  return (
    <label className="flex items-center justify-end space-x-2 cursor-pointer text-accent">
      <span className="text-xs label-text">
        Convert to {unwrappedAssetName}
      </span>
      <input
        disabled={swapStatus !== SwapStatus.IDLE}
        type="checkbox"
        defaultChecked={shouldUnwrapAsset}
        onChange={(e) => setShouldUnwrapAsset(e.target.checked)}
        className="checkbox checkbox-accent checkbox-sm"
      />
    </label>
  );
};
