import React from "react";

import {
  DepositAddressGeneration,
  Idle,
  SrcChainTxExecution,
  SrcChainTxPropagation,
} from "features/swap-states/states";

export const SwapExecutionState = () => {
  return (
    <>
      <Idle />
      <DepositAddressGeneration />
      <SrcChainTxExecution />
      <SrcChainTxPropagation />
      {/* DepositAddressGenerationState */}
      {/* WaitForSrcChainTxState */}
      {/* WaitForDestChainTxState */}
      {/* TxSummaryState */}
    </>
  );
  return null;
};
