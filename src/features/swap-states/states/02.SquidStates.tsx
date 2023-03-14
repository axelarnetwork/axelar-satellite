import React, { useEffect, useState } from "react";
import Image from "next/image";
import { StatusResponse } from "@0xsquid/sdk";
import { GMPStatus } from "@axelar-network/axelarjs-sdk";
import usePoll from "react-use-poll";
import { SpinnerRoundFilled } from "spinners-react";
import { useWaitForTransaction } from "wagmi";

import { ENVIRONMENT } from "~/config/constants";
import { InputWrapper } from "~/components/common";

import { getSrcChainId, useSquidStateStore, useSwapStore } from "~/store";

import { squid } from "~/squid.config";
import { SwapStatus } from "~/utils/enums";

import { ProgressBar } from "../components";

enum SquidSwapStatus {
  WAIT_SRC_CHAIN = 1,
  SRC_GATEWAY_CALLED = 2,
  DEST_EXECUTING = 3,
  DEST_EXECUTED = 4,
}

export const SquidStates = () => {
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);
  const swapStatus = useSwapStore((state) => state.swapStatus);
  const srcChainId = useSwapStore(getSrcChainId);
  const [numConfirmationsSoFar, setNumConfirmationsSoFar] = useState(0);

  const setSwapStatus = useSwapStore((state) => state.setSwapStatus);

  const { txReceipt, routeData, statusResponse, setStatusResponse } =
    useSquidStateStore();

  const [progress, setProgress] = useState<SquidSwapStatus>(
    SquidSwapStatus.WAIT_SRC_CHAIN
  );
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    let prog = SquidSwapStatus.WAIT_SRC_CHAIN;
    let txt = `Waiting for your transaction on ${srcChain.chainName}...`;
    if (statusResponse?.status && progress < 4) {
      console.log("02.SquidStates", statusResponse.status);
      switch (statusResponse.status) {
        case GMPStatus.SRC_GATEWAY_CALLED: {
          txt = `Transaction on ${srcChain.chainName} detected`;
          prog = SquidSwapStatus.SRC_GATEWAY_CALLED;
          break;
        }
        case GMPStatus.DEST_EXECUTING: {
          txt = `Arrived on ${destChain.chainName}. Awaiting final execution...`;
          prog = SquidSwapStatus.DEST_EXECUTING;
          break;
        }
        case GMPStatus.DEST_EXECUTED: {
          txt = "Swap complete!";
          prog = SquidSwapStatus.DEST_EXECUTED;
          setSwapStatus(SwapStatus.SQUID_FINISHED);
          break;
        }
        case "express_executed": {
          txt = "Swap complete!";
          prog = SquidSwapStatus.DEST_EXECUTED;
          setSwapStatus(SwapStatus.SQUID_FINISHED);
          break;
        }
        default:
      }
    }
    setProgress(prog);
    setStatusText(txt);
  }, [destChain, setSwapStatus, statusResponse, srcChain]);

  useWaitForTransaction({
    chainId: srcChainId,
    hash: txReceipt?.transactionHash as `0x${string}`,
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
    enabled: !!txReceipt?.transactionHash,
  });

  usePoll(
    () => {
      if (!txReceipt) {
        return;
      }
      if (!routeData) {
        return;
      }
      if (progress === SquidSwapStatus.DEST_EXECUTED) {
        return;
      }

      const getStatusParams = {
        transactionId: txReceipt.transactionHash,
        routeType: routeData.transactionRequest.routeType,
      };

      squid
        .getStatus(getStatusParams)
        .then((status: StatusResponse) => setStatusResponse(status));
    },
    [txReceipt, routeData, progress],
    {
      interval: 10000,
    }
  );

  if (swapStatus !== SwapStatus.WAIT_FOR_SQUID) {
    return null;
  }

  const getStatus = () => {
    if (progress !== SquidSwapStatus.SRC_GATEWAY_CALLED) {
      return;
    }
    if (
      ENVIRONMENT === "mainnet" &&
      srcChain.chainName?.toLowerCase() === "ethereum"
    ) {
      return (
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
          <div className="flex items-center mt-2 gap-x-2">
            <progress
              className="w-56 progress progress-success"
              value={numConfirmationsSoFar}
              max={96}
            />
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center gap-x-5">
        <div className="flex items-center gap-x-2">
          <SpinnerRoundFilled
            className="text-blue-500"
            size={20}
            color="#00a6ff"
          />
          <span className="text-sm">
            Waiting for{" "}
            {Math.min(numConfirmationsSoFar, srcChain.confirmLevel as number)}/
            {srcChain.confirmLevel} confirmations before sending to Axelar...
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
    );
  };

  return (
    <>
      <InputWrapper className="h-auto">
        <div className="h-full space-x-2">
          <div className="flex flex-col w-full h-full">
            <div className="h-full">
              <ProgressBar currentLevel={progress} maxLevels={4} />
              <div className="h-6" />
              <div className="flex items-center justify-center h-full py-4 text-base gap-x-2">
                <SpinnerRoundFilled
                  size={20}
                  thickness={147}
                  color={"#00a5ff"}
                />
                <span className="font-semibold">{statusText}</span>
              </div>

              {getStatus()}

              {statusResponse?.axelarTransactionUrl && (
                <div className="flex flex-col items-center">
                  <div className="my-0 divider" />
                  <a
                    className="flex items-center text-primary hover:underline gap-x-2"
                    href={statusResponse?.axelarTransactionUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{"View transaction progress on Axelarscan..."}</span>
                    <Image
                      src={"/assets/ui/link.svg"}
                      height={16}
                      width={16}
                      alt="axelarscan"
                    />
                  </a>
                  <div className="h-2" />
                </div>
              )}
            </div>
          </div>
        </div>
      </InputWrapper>
    </>
  );
};
