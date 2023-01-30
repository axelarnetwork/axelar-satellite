import React from "react";

import { DepositAddressGeneration, Idle } from "features/swap-states/states";

import { useSwapStore } from "store";

export const SwapExecutionState = () => {
  const swapStatus = useSwapStore((state) => state.swapStatus);

  return (
    <>
      <Idle />
      <DepositAddressGeneration />
      {/* DepositAddressGenerationState */}
      {/* WaitForSrcChainTxState */}
      {/* WaitForDestChainTxState */}
      {/* TxSummaryState */}
    </>
  );
  return null;
};
