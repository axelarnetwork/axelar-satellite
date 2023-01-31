import React from "react";

import {
  DepositAddressGeneration,
  Idle,
  SrcChainTxConfirmation,
  SrcChainTxExecution,
} from "features/swap-states/states";

import { useSwapStore } from "store";

export const SwapExecutionState = () => {
  return (
    <>
      <Idle />
      <DepositAddressGeneration />
      <SrcChainTxExecution />
      {/* DepositAddressGenerationState */}
      {/* WaitForSrcChainTxState */}
      {/* WaitForDestChainTxState */}
      {/* TxSummaryState */}
    </>
  );
  return null;
};
