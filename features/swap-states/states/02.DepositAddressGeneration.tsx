import { InputWrapper } from "components/common";
import { TransferStats } from "components/swap/parts";
import { ProgressBar } from "components/swap/states/parts";
import React from "react";
import { SpinnerRoundFilled } from "spinners-react";
import { useSwapStore } from "store";
import { SwapStatus } from "utils/enums";

export const DepositAddressGeneration = () => {
  const swapStatus = useSwapStore((state) => state.swapStatus);

  if (swapStatus !== SwapStatus.GEN_DEPOSIT_ADDRESS) return null;

  return (
    <>
      <TransferStats />
      <InputWrapper className="h-1 min-h-[10rem]">
        <div className="h-full space-x-2">
          <div className="flex flex-col w-full h-full">
            <div className="relative flex flex-col h-full">
              <ProgressBar level={1} />

              <div className="flex items-center justify-center h-full py-4 text-base gap-x-2">
                <SpinnerRoundFilled
                  size={20}
                  thickness={147}
                  color={"#00a5ff"}
                />
                <span className="font-semibold">
                  Generating deposit address...
                </span>
              </div>
            </div>
          </div>
        </div>
      </InputWrapper>
    </>
  );
};
