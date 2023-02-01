import React from "react";

import { useSwapStore } from "store";

import { SwapStatus } from "utils/enums";

export const TxSummary = () => {
  const swapStatus = useSwapStore((state) => state.swapStatus);

  if (swapStatus !== SwapStatus.FINISHED) return null;
  return <div>TxSummaryState</div>;
};
