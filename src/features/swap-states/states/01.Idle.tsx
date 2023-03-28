import React from "react";

import { AddressFiller } from "~/features/swap-states/components";

import { useSwapStore } from "~/store";

import { SwapStatus } from "~/utils/enums";

export const Idle = () => {
  const swapStatus = useSwapStore((state) => state.swapStatus);

  if (swapStatus !== SwapStatus.IDLE) {
    return null;
  }

  return <AddressFiller />;
};
