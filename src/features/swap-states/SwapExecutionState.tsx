import React from "react";

import { TransferStats } from "~/components/swap/parts";
import {
  DepositAddressGeneration,
  Idle,
  SrcChainTxConfirmation,
  SrcChainTxExecution,
  SrcChainTxPropagation,
  TxSummary,
} from "~/features/swap-states/states";

export const SwapExecutionState = () => {
  return (
    <>
      <TransferStats />
      <Idle />
      <DepositAddressGeneration />
      <SrcChainTxExecution />
      <SrcChainTxPropagation />
      <SrcChainTxConfirmation />
      <TxSummary />
    </>
  );
};
