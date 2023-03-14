import React from "react";

import { useSquidStateStore, useSwapStore } from "~/store";

import { SwapStatus } from "~/utils/enums";

export const StopButton = () => {
  const { swapStatus, resetState } = useSwapStore((state) => state);
  const resetSquidState = useSquidStateStore((state) => state.resetSquidState);

  function handleOnClick() {
    resetState();
    resetSquidState();
  }

  if (swapStatus === SwapStatus.IDLE) {
    return null;
  }

  return (
    <button
      className="relative tooltip px-2 py-1 rounded-lg border border-[#00a7ff] bg-[#003556] text-[#00a7ff] text-xs cursor-pointer font-semibold"
      data-tip="Refresh and make another transfer"
      onClick={handleOnClick}
    >
      Start Over
    </button>
  );
};
