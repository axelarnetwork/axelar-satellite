import React from "react";
import dynamic from "next/dynamic";

import { TransferStats } from "~/components/swap/parts";

import {
  DepositAddressGeneration,
  Idle,
  SrcChainTxConfirmation,
  SrcChainTxExecution,
  SrcChainTxPropagation,
  TxSummary,
} from "~/features/swap-states/states";

import { useSquidStateStore, useSwapStore } from "~/store";

import { SwapStatus } from "~/utils/enums";

const SquidStates = dynamic(
  () => import("~/features/swap-states/states/02.SquidStates")
);
const TransferSwapStats = dynamic(
  () => import("~/components/swap/parts/TransferSwapStats")
);

const SquidTxSummary = dynamic(
  () => import("~/features/swap-states/states/07.SquidTxSummary")
);

export const SwapExecutionState = () => {
  const swapStatus = useSwapStore((state) => state.swapStatus);
  const isSquidTrade = useSquidStateStore((state) => state.isSquidTrade);
  return (
    <>
      <Idle />
      {!isSquidTrade && <TransferStats />}
      {isSquidTrade && <TransferSwapStats />}
      {/* waiting screen while deposit address is being generated */}
      {!isSquidTrade && <DepositAddressGeneration />}
      {isSquidTrade && <SquidStates />}
      {/* evm/ibc execution screen with evm/cosmos tx buttons */}
      {!isSquidTrade && <SrcChainTxExecution />}
      {/* screen only for evm TODO: maybe create one specific to cosmos transfers */}
      {!isSquidTrade && <SrcChainTxPropagation />}
      {/* shown when tx detected on src chain by axelar */}
      {swapStatus === SwapStatus.WAIT_FOR_CONFIRMATION && (
        <SrcChainTxConfirmation />
      )}
      {isSquidTrade && <SquidTxSummary />}
      {!isSquidTrade && <TxSummary />}
    </>
  );
};
