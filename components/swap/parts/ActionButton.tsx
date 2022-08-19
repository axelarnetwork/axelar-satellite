import React from "react";
import { useSwapStore, useWalletStore } from "../../../store";
import { SwapStatus } from "../../../utils/enums";
import { ConnectButton } from "./ConnectButton";
import { GenerateDepositAddressButton } from "./GenerateDepositAddressButton";

export const ActionButton = () => {
  const { swapStatus, resetState } = useSwapStore((state) => state);
  // const wagmiConnected = useWalletStore((state) => state.wagmiConnected);
  // if (!wagmiConnected) return <ConnectButton />;
  if (swapStatus === SwapStatus.IDLE) return <GenerateDepositAddressButton />;
  if (swapStatus === SwapStatus.GEN_DEPOSIT_ADDRESS)
    return (
      <button className="w-full btn btn-primary" disabled>
        <div className="flex items-center gap-3">
          <span>Processing...</span>
        </div>
      </button>
    );
  if (swapStatus === SwapStatus.WAIT_FOR_DEPOSIT)
    return (
      <button className="w-full btn btn-primary" disabled>
        <div className="flex items-center gap-3">
          <span>Waiting for deposit...</span>
        </div>
      </button>
    );
  if (swapStatus === SwapStatus.WAIT_FOR_CONFIRMATION)
    return (
      <button className="w-full btn btn-primary" disabled>
        <div className="flex items-center gap-3">
          <span>Waiting for confirmation...</span>
        </div>
      </button>
    );
  if (swapStatus === SwapStatus.FINISHED)
    return (
      <button className="w-full btn btn-primary" onClick={resetState}>
        <div className="flex items-center gap-3">
          <span>Make another transfer?</span>
        </div>
      </button>
    );
  return null;
};
