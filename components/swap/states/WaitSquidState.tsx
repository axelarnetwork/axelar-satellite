import React, { useEffect, useState } from "react";
import Image from "next/image";

import { StatusResponse } from "@0xsquid/sdk";
import { GMPStatus } from "@axelar-network/axelarjs-sdk";

import {
  getSelectedAssetSymbol,
  useSquidStateStore,
  useSwapStore,
} from "../../../store";

import usePoll from "react-use-poll";
import { squid } from "squid.config";
import { SwapStatus } from "utils/enums";

import { copyToClipboard } from "../../../utils";
import { renderGasFee } from "../../../utils/renderGasFee";
import { convertChainName } from "../../../utils/transformers";
import { AddressShortener, InputWrapper } from "../../common";
import { TransferSwapStats } from "../parts";
import { ProgressBar } from "./parts";

export const WaitSquidState = () => {
  const { setSwapStatus, destAddress, srcChain, destChain, asset } =
    useSwapStore((state) => state);
  const selectedAssetSymbol = useSwapStore(getSelectedAssetSymbol);
  const [relayerGasFee, setRelayerGasFee] = useState<string>("");
  const { txReceipt, routeData, statusResponse, setStatusResponse } =
    useSquidStateStore();
  const [progress, setProgress] = useState(1);
  const [statusText, setStatusText] = useState(
    `Waiting for your transaction on ${srcChain.chainName}...`
  );

  useEffect(() => {
    if (statusResponse && statusResponse.status) {
      let prog = 1,
        txt = "";
      switch (statusResponse.status) {
        case GMPStatus.SRC_GATEWAY_CALLED:
          txt = `Acknowledged on ${srcChain.chainName}`;
          prog = 2;
          break;
        // case GMPStatus.DEST_GATEWAY_APPROVED:
        //   txt = "Received on destination chain";
        //   prog = 2;
        //   break;
        case GMPStatus.DEST_EXECUTING:
          txt = "Executing on destination chain";
          prog = 3;
          break;
        case GMPStatus.DEST_EXECUTED:
          txt = "Swap complete!";
          prog = 4;
          setSwapStatus(SwapStatus.SQUID_FINISHED);
          break;
        default:
      }
      setProgress(prog);
      setStatusText(txt);
    }
  }, [statusResponse]);

  useEffect(() => {
    if (!srcChain || !destChain || !asset) return;
    renderGasFee(srcChain, destChain, asset).then((res) =>
      setRelayerGasFee(res)
    );
  }, [srcChain, destChain, asset]);

  usePoll(
    () => {
      if (!txReceipt || !routeData) return;
      if (statusResponse && statusResponse.status === GMPStatus.DEST_EXECUTED)
        return;

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
      interval: 3000,
    }
  );

  return (
    <>
      <TransferSwapStats />
      <InputWrapper className="h-auto">
        <div className="h-full space-x-2">
          <div className="flex flex-col w-full h-full">
            <div className="h-full">
              <ProgressBar level={progress} numSteps={4} />
              <div className="h-6" />
              <h2 className="text-lg font-bold text-center capitalize">
                {statusText}
              </h2>
              <div className="h-6" />

              {statusResponse?.axelarTransactionUrl && (
                <div className="flex items-center">
                  <a
                    href={statusResponse?.axelarTransactionUrl}
                    target="_blank"
                    className="w-full text-lg font-bold text-center"
                  >
                    Axelarscan link
                  </a>
                </div>
              )}

              <div className="my-0 divider" />
            </div>
          </div>
        </div>
      </InputWrapper>
    </>
  );
};
