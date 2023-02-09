import React from "react";

import { useSwapStore } from "~/store";

import { BalanceInfo } from "./BalanceInfo";

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
