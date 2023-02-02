import React from "react";

import { TransferStats } from "components/swap/parts";

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
      <TransferStats />
      <Idle />
      {/* waiting screen while deposit address is being generated */}
      <DepositAddressGeneration />
      {/* evm/ibc execution screen with evm/cosmos tx buttons */}
      <SrcChainTxExecution />
      {/* screen only for evm TODO: maybe create one specific to cosmos transfers */}
      <SrcChainTxPropagation />
      {/* shown when tx detected on src chain by axelar */}
      <SrcChainTxConfirmation />
      <TxSummary />
    </>
  );
};
