import React from "react";

import {
  DepositAddressGeneration,
  Idle,
  SrcChainTxConfirmation,
  SrcChainTxExecution,
  SrcChainTxPropagation,
  TxSummary,
} from "features/swap-states/states";

export const SwapExecutionState = () => {
  return (
    <>
      <Idle />
      <DepositAddressGeneration />
      <SrcChainTxExecution />
      <SrcChainTxPropagation />
      <SrcChainTxConfirmation />
      <TxSummary />
    </>
  );
};
