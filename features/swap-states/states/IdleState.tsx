import React from "react";

import { TransferStats } from "components/swap/parts";

import { AddressFiller } from "features/swap-states/components";

import { useSwapStore } from "store";

import { SwapStatus } from "utils/enums";

export const IdleState = () => {
  const swapStatus = useSwapStore((state) => state.swapStatus);

  if (swapStatus !== SwapStatus.IDLE) return null;

  return (
    <>
      <TransferStats />
      <AddressFiller />
    </>
  );
};
