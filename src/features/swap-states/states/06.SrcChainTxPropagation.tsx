import React, { useState } from "react";
import { SpinnerRoundFilled } from "spinners-react";
import { useWaitForTransaction } from "wagmi";

import { InputWrapper } from "~/components/common";

import { getSrcChainId, useSwapStore } from "~/store";

import { ENVIRONMENT } from "~/config/constants";
import { Hash } from "~/types";
import { SwapStatus } from "~/utils/enums";

import { ProgressBar } from "../components";

export const SrcChainTxPropagation = () => {
  const swapStatus = useSwapStore((state) => state.swapStatus);

  const [numConfirmationsSoFar, setNumConfirmationsSoFar] = useState(1);
  const srcChain = useSwapStore((state) => state.srcChain);
  const txInfo = useSwapStore((state) => state.txInfo);
  const srcChainId = useSwapStore(getSrcChainId);

  useWaitForTransaction({
    chainId: srcChainId,
    hash: txInfo?.sourceTxHash as Hash,
    onSettled(data, error) {
      setNumConfirmationsSoFar(numConfirmationsSoFar + 1);
    },
    confirmations: Math.min(
      numConfirmationsSoFar,
      ENVIRONMENT === "mainnet" &&
        srcChain.chainName?.toLowerCase() === "ethereum"
        ? 96
        : (srcChain.confirmLevel as number)
    ),
    enabled: !!txInfo?.sourceTxHash,
  });

  if (swapStatus !== SwapStatus.WAIT_FOR_SRC_TX_PROPAGATION) {
    return null;
  }

  if (
    ENVIRONMENT === "mainnet" &&
    srcChain.chainName.toLowerCase() === "ethereum"
  ) {
    return (
      <>
        <InputWrapper className="h-auto">
          <div className="h-full space-x-2">
            <div className="flex flex-col items-center my-2 gap-x-5">
              <div className="flex items-center w-9/12 gap-x-2">
                <div className="w-full space-x-2">
                  <div className="text-sm text-center">
                    <div>Waiting for 2 epochs (~64-96 blocks)</div>
                  </div>
                  <div className="flex justify-center space-x-2 text-sm text-center">
                    <div className="text-slate-400">Current height:</div>
                    <div className="text-slate-400">
                      {numConfirmationsSoFar > 96 && ">"}
                      {Math.min(numConfirmationsSoFar, 96)} block
                      {numConfirmationsSoFar > 1 && "s"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-full mt-2 gap-x-2">
                <progress
                  className="w-56 progress progress-success"
                  value={numConfirmationsSoFar}
                  max={96}
                />
              </div>
            </div>
          </div>
        </InputWrapper>
      </>
    );
  }

  return (
    <>
      <InputWrapper className="h-auto">
        <div className="h-full space-x-2">
          <div className="flex flex-col items-center my-2 gap-x-5">
            <div className="h-full">
              <ProgressBar currentLevel={2} maxLevels={4} />
              <div className="flex items-center mt-8 gap-x-2">
                <SpinnerRoundFilled
                  className="text-blue-500"
                  size={20}
                  color="#00a6ff"
                />
                <span className="text-sm">
                  Waiting for{" "}
                  {Math.min(
                    numConfirmationsSoFar,
                    srcChain.confirmLevel as number
                  )}
                  /{srcChain.confirmLevel} confirmations before forwarding to
                  Axelar...
                </span>
              </div>
              <div className="flex items-center mt-2 gap-x-2">
                <progress
                  className="w-56 progress progress-success"
                  value={numConfirmationsSoFar}
                  max={srcChain.confirmLevel}
                />
              </div>
            </div>
          </div>
        </div>
      </InputWrapper>
    </>
  );
};
