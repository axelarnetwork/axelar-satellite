import React from "react";

import { TransferStats, TransferSwapStats } from "~/components/swap/parts";

import {
  DepositAddressGeneration,
  Idle,
  SquidStates,
  SquidTxSummary,
  SrcChainTxConfirmation,
  SrcChainTxExecution,
  SrcChainTxPropagation,
  TxSummary,
} from "~/features/swap-states/states";

import { useSwapStore } from "~/store";

import { SwapStatus } from "~/utils/enums";

export const SwapExecutionState = () => {
  const swapStatus = useSwapStore((state) => state.swapStatus);
  return (
    <>
      <Idle />
      <TransferStats />
      <TransferSwapStats />
      {/* waiting screen while deposit address is being generated */}
      <DepositAddressGeneration />
      <SquidStates />
      {/* evm/ibc execution screen with evm/cosmos tx buttons */}
      <SrcChainTxExecution />
      {/* screen only for evm TODO: maybe create one specific to cosmos transfers */}
      <SrcChainTxPropagation />
      {/* shown when tx detected on src chain by axelar */}
      {/* {swapStatus === SwapStatus.WAIT_FOR_CONFIRMATION && (
        <SrcChainTxConfirmation />
      )} */}
      <SquidTxSummary />
      <TxSummary />
    </>
  );
};
