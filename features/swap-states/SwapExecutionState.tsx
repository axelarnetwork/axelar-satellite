import React from "react";

import { IdleState } from "features/swap-states/states";

import { useSwapStore } from "store";

export const SwapExecutionState = () => {
  const swapStatus = useSwapStore((state) => state.swapStatus);

  return (
    <>
      <IdleState />
    </>
  );
  return null;
};
