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
import { ChainInfoExtended } from "~/types";
import { SwapStatus } from "~/utils/enums";

import { ProgressBar } from "../components";

enum SquidSwapStatus {
  WAIT_SRC_CHAIN = 1,
  SRC_GATEWAY_CALLED = 2,
  CONFIRMED = 3,
  DEST_EXECUTING = 4,
  DEST_EXECUTED = 5,
}

export const SquidStates = () => {
  const srcChain: ChainInfoExtended = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);
  const swapStatus = useSwapStore((state) => state.swapStatus);
  const srcChainId = useSwapStore(getSrcChainId);

  const [numConfirmationsSoFar, setNumConfirmationsSoFar] = useState(0);

  const setSwapStatus = useSwapStore((state) => state.setSwapStatus);

  const {
    txReceipt,
    routeData,
    statusResponse,
    setStatusResponse,
    enableGMPExpress,
  } = useSquidStateStore();

  const [progress, setProgress] = useState<SquidSwapStatus>(
    SquidSwapStatus.WAIT_SRC_CHAIN
  );
  const [statusText, setStatusText] = useState("");

  const getPropgress = (ctx: {
    destChain: ChainInfoExtended;
    progress: SquidSwapStatus;
    srcChain: ChainInfoExtended;
    statusResponse: StatusResponse | null;
  }) => {
    if (ctx.statusResponse?.status && ctx.progress < 5) {
      switch (ctx.statusResponse.status) {
        case GMPStatus.SRC_GATEWAY_CALLED: {
          return {
            prog: SquidSwapStatus.SRC_GATEWAY_CALLED,
            txt: `Transaction on ${ctx.srcChain.chainName} detected`,
          };
        }
        case GMPStatus.SRC_GATEWAY_CONFIRMED: {
          return {
            prog: SquidSwapStatus.CONFIRMED,
            txt: `Confirmed on Axelar and sending to ${ctx.destChain.chainName}`,
          };
        }
        case GMPStatus.DEST_EXECUTING: {
          return {
            prog: SquidSwapStatus.DEST_EXECUTING,
            txt: `Arrived on ${ctx.destChain.chainName}. Awaiting final execution...`,
          };
        }
        case GMPStatus.DEST_EXECUTED: {
          return {
            prog: SquidSwapStatus.DEST_EXECUTED,
            txt: "Swap complete!",
            nextStatus: SwapStatus.SQUID_FINISHED,
          };
        }
        case "express_executed": {
          return {
            prog: SquidSwapStatus.DEST_EXECUTED,
            txt: "Swap complete!",
            nextStatus: SwapStatus.SQUID_FINISHED,
          };
        }
      }
    }

    return {
      prog: SquidSwapStatus.WAIT_SRC_CHAIN,
      txt: `Waiting for your transaction on ${ctx.srcChain.chainName}...`,
    };
  };

  useEffect(() => {
    setProgress((progress) => {
      const { prog, txt, nextStatus } = getPropgress({
        destChain,
        srcChain,
        statusResponse,
        progress,
      });
      if (nextStatus) {
        setSwapStatus(nextStatus);
      }
      setStatusText(txt);
      return prog ?? progress;
    });
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
        routeType: routeData.transactionRequest?.routeType,
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
    if (progress !== SquidSwapStatus.SRC_GATEWAY_CALLED || enableGMPExpress) {
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
          <span className="text-sm">
            Waiting for{" "}
            {Math.min(numConfirmationsSoFar, srcChain.confirmLevel as number)}/
            {srcChain.confirmLevel} confirmations before sending to Axelar...
          </span>
        </div>
        <div className="flex items-center my-2 gap-x-2">
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
              <ProgressBar currentLevel={progress} maxLevels={5} />
              <div className="h-2" />
              <div className="flex items-center justify-center h-full py-4 text-base gap-x-2">
                {progress !== SquidSwapStatus.DEST_EXECUTED && (
                  <SpinnerRoundFilled
                    size={20}
                    thickness={147}
                    color={"#00a5ff"}
                  />
                )}
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
                    <span>{"View transaction details on Axelarscan..."}</span>
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

export default SquidStates;
