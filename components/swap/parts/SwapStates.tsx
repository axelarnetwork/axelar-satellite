import React from "react";

import { SquidFinished } from "components/swap/states/SquidFinished";
import { WaitSquidState } from "components/swap/states/WaitSquidState";

import { useSwapStore } from "../../../store";

import { SwapStatus } from "../../../utils/enums";
import {
  ConfirmTransferState,
  GenDepositAddressState,
  IdleState,
  WaitCosmosConfirmationState,
  WaitDepositState,
  WaitEvmConfirmationState,
} from "../states";

export const SwapStates = () => {
  const { swapStatus, destChain } = useSwapStore((state) => state);

  /**Deposit Address States */
  if (swapStatus === SwapStatus.IDLE) return <IdleState />;
  if (swapStatus === SwapStatus.GEN_DEPOSIT_ADDRESS)
    return <GenDepositAddressState />;
  if (swapStatus === SwapStatus.WAIT_FOR_DEPOSIT) return <WaitDepositState />;
  if (
    swapStatus === SwapStatus.WAIT_FOR_CONFIRMATION &&
    destChain?.module === "evm"
  )
    return <WaitEvmConfirmationState />;
  if (
    swapStatus === SwapStatus.WAIT_FOR_CONFIRMATION &&
    destChain?.module === "axelarnet"
  )
    return <WaitCosmosConfirmationState />;
  if (swapStatus === SwapStatus.FINISHED) return <ConfirmTransferState />;

  /**Squid states */
  if (swapStatus === SwapStatus.WAIT_FOR_SQUID) return <WaitSquidState />;
  if (swapStatus === SwapStatus.SQUID_FINISHED) return <SquidFinished />;

  return null;
};
