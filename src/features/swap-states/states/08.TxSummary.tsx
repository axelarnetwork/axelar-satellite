import React from "react";

import { InputWrapper } from "~/components/common";

import { useSwapStore } from "~/store";

import { SwapStatus } from "~/utils/enums";

import { ProgressBar, TxSummaryStats } from "../components";

export const TxSummary = () => {
  const swapStatus = useSwapStore((state) => state.swapStatus);

  if (swapStatus !== SwapStatus.FINISHED) {
    return null;
  }

  return (
    <>
      <InputWrapper className="h-auto">
        <div className="h-full space-x-2">
          <div className="flex flex-col w-full h-full">
            <div className="relative flex flex-col h-full">
              <ProgressBar currentLevel={4} maxLevels={4} />
              <div className="flex items-center justify-center h-full py-4 mt-auto text-xs gap-x-2">
                <TxSummaryStats />
              </div>
            </div>
          </div>
        </div>
      </InputWrapper>
    </>
  );
};
