import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { SpinnerRoundFilled } from "spinners-react";
import { useWaitForTransaction } from "wagmi";

import { ENVIRONMENT } from "~/config/constants";
import { InputWrapper } from "~/components/common";

import { getSrcChainId, useSwapStore } from "~/store";

import { Hash } from "~/types";
import { SwapStatus } from "~/utils/enums";

import { ProgressBar } from "../components";
import { AxelarscanLink } from "../components/tx-summary-stats/AxelarscanLink";

const InfoIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="w-5 h-5 pb-1 mx-1 stroke-current"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const SrcChainTxPropagation = () => {
  const swapStatus = useSwapStore((state) => state.swapStatus);
  const srcChain = useSwapStore((state) => state.srcChain);
  const txInfo = useSwapStore((state) => state.txInfo);
  const srcChainId = useSwapStore(getSrcChainId);
  const [numConfirmationsSoFar, setNumConfirmationsSoFar] = useState(1);

  useEffect(() => {
    if (swapStatus === SwapStatus.IDLE) setNumConfirmationsSoFar(1);
  }, [swapStatus]);

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

  const filecoinMsg = useMemo(() => {
    return srcChain?.chainName.toLowerCase().includes("filecoin")
      ? "Transfers from Filecoin will take at least ~1 hour to complete due to the long block finality of Filecoin, so Check Axelarscan for updates on your transfer."
      : null;
  }, [srcChain]);

  const srcChainName = useMemo(() => {
    if (filecoinMsg)
      return (
        <a
          className="flex flex-row ml-1 cursor-pointer tooltip tooltip-warning link link-primary"
          data-tip={filecoinMsg}
          href={
            "https://docs.filecoin.io/basics/what-is-filecoin/blockchain/#finality"
          }
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          {" "}
          {srcChain.chainName}
          {InfoIcon}
        </a>
      );

    let name = "";
    if (srcChain.chainName.toLowerCase()?.includes("base")) {
      name = "Goerli L1";
    } else {
      name = srcChain.chainName;
    }
    return <div className="ml-1"> {name}</div>;
  }, [srcChain, filecoinMsg]);

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
                <div className="flex flex-col text-center">
                  {" "}
                  <div className={clsx("flex flex-row text-sm")}>
                    Waiting for transaction to be finalized on {srcChainName}
                  </div>
                  {!filecoinMsg && (
                    <div className="text-sm text-gray-400">
                      (
                      {Math.min(
                        numConfirmationsSoFar,
                        srcChain.confirmLevel as number
                      )}
                      /{srcChain.confirmLevel} confirmations)
                    </div>
                  )}
                </div>
              </div>
              {!filecoinMsg && (
                <div className="flex items-center justify-center mt-2 gap-x-2">
                  <progress
                    className="w-56 progress progress-success"
                    value={numConfirmationsSoFar}
                    max={srcChain.confirmLevel}
                  />
                </div>
              )}
              <div className="my-0 divider" />
              <div className="flex justify-center w-full">
                <AxelarscanLink />
              </div>
            </div>
          </div>
        </div>
      </InputWrapper>
    </>
  );
};
