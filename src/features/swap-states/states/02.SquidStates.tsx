import React, { useEffect, useState } from "react";
import Image from "next/image";
import { StatusResponse } from "@0xsquid/sdk";
import { GMPStatus } from "@axelar-network/axelarjs-sdk";
import usePoll from "react-use-poll";
import { SpinnerRoundFilled } from "spinners-react";

import { InputWrapper } from "~/components/common";

import { useSquidStateStore, useSwapStore } from "~/store";

import { squid } from "~/squid.config";
import { SwapStatus } from "~/utils/enums";

import { ProgressBar } from "../components";

export const SquidStates = () => {
  const srcChain = useSwapStore((state) => state.srcChain);
  const destChain = useSwapStore((state) => state.destChain);
  const swapStatus = useSwapStore((state) => state.swapStatus);

  const setSwapStatus = useSwapStore((state) => state.setSwapStatus);

  const { txReceipt, routeData, statusResponse, setStatusResponse } =
    useSquidStateStore();

  const [progress, setProgress] = useState(1);
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    if (statusResponse?.status) {
      let prog = 1;
      let txt = "";
      switch (statusResponse.status) {
        case GMPStatus.SRC_GATEWAY_CALLED: {
          txt = "Acknowledged. Processing your transaction.";
          prog = 2;
          break;
        }
        case GMPStatus.DEST_EXECUTING: {
          txt = `Awaiting final execution on ${destChain.chainName}.`;
          prog = 3;
          break;
        }
        case GMPStatus.DEST_EXECUTED: {
          txt = "Swap complete!";
          prog = 4;
          setSwapStatus(SwapStatus.SQUID_FINISHED);
          break;
        }
        default:
      }
      setProgress(prog);
      setStatusText(txt);
    } else {
      setProgress(1);
      setStatusText(`Waiting for your transaction on ${srcChain.chainName}...`);
    }
  }, [destChain, setSwapStatus, statusResponse, srcChain]);

  usePoll(
    () => {
      if (!(txReceipt && routeData)) {
        return;
      }
      if (statusResponse && statusResponse.status === GMPStatus.DEST_EXECUTED) {
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
    [txReceipt, routeData],
    {
      interval: 10000,
    }
  );

  if (swapStatus !== SwapStatus.WAIT_FOR_SQUID) {
    return null;
  }

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
