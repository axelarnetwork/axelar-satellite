import React from "react";

import { getUnwrappedAssetSymbol, useSwapStore } from "../../../store";
import { SwapStatus } from "../../../utils/enums";

export const UnwrapToNativeChainCheckbox = () => {
  const unwrappedAssetName = useSwapStore(getUnwrappedAssetSymbol);
  const {
    shouldUnwrapAsset,
    setShouldUnwrapAsset,
    swapStatus,
    destChain,
    srcChain,
  } = useSwapStore((state) => state);

  if (!unwrappedAssetName) return null;
  if (srcChain.module !== "evm") return null;
  return (
    <label className="flex items-center justify-end space-x-2 cursor-pointer text-accent">
      <span className="text-xs label-text">
        Receive {unwrappedAssetName} on{" "}
        <span className="capitalize label-text">{destChain.chainName}</span>
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
