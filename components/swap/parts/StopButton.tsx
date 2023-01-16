import React from "react";

import { useSwapStore } from "../../../store";

import { SwapStatus } from "../../../utils/enums";

export const StopButton = () => {
  const { swapStatus, resetState } = useSwapStore((state) => state);

  function handleOnClick() {
    resetState();
  }

  if (swapStatus === SwapStatus.IDLE) return null;

  return (
    <div
      onClick={handleOnClick}
      className="relative tooltip px-2 py-1 rounded-lg border border-[#00a7ff] bg-[#003556] text-[#00a7ff] text-xs cursor-pointer font-semibold"
      data-tip="Refresh and make another transfer"
    >
      Start Over
    </div>
  );
};
