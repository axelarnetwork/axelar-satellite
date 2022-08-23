import React from "react";
import Image from "next/image";
import { useSwapStore } from "../../../store";
import { SwapStatus } from "../../../utils/enums";

export const StopButton = () => {
  const { swapStatus, resetState } = useSwapStore((state) => state);

  function handleOnClick() {
    resetState();
  }

  if (
    swapStatus === SwapStatus.IDLE ||
    swapStatus === SwapStatus.GEN_DEPOSIT_ADDRESS
  )
    return null;

  return (
    <div
      onClick={handleOnClick}
      className="relative w-6 h-6 cursor-pointer tooltip"
      data-tip="Click to cancel the current transfer"
    >
      <Image src="/assets/ui/stop.svg" layout="fill" />
    </div>
  );
};
