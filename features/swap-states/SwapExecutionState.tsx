import React from "react";

import {
  DepositAddressGeneration,
  Idle,
  SrcChainTxPropagation,
  SrcChainTxExecution,
} from "features/swap-states/states";

import { useSwapStore } from "store";

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
