import React from "react";

import { BalanceInfo } from "features/asset-selector/BalanceInfo";

import { useSwapStore } from "store";

export const AssetInput = () => {
  const tokensToTransfer = useSwapStore((state) => state.tokensToTransfer);
  const setTokensToTransfer = useSwapStore(
    (state) => state.setTokensToTransfer
  );

  return (
    <div className="text-end">
      <input
        className="text-lg font-bold text-right bg-transparent outline-none"
        type="number"
        value={tokensToTransfer}
        placeholder="0"
        onChange={(e) => setTokensToTransfer(e.target.value)}
      />
      <BalanceInfo />
    </div>
  );
};
