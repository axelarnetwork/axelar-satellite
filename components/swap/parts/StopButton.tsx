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
      className="relative cursor-pointer tooltip px-2 py-1 rounded-lg border border-[#00a7ff] bg-[#003556] text-[#00a7ff] text-xs cursor-pointer font-semibold" //"relative w-6 h-6 cursor-pointer tooltip"
      data-tip="Refresh and make another transfer"
    >
      Start Over
    </div>
  );
};
