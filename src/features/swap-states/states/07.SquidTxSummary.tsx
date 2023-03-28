import React from "react";
import Image from "next/image";

import { InputWrapper } from "~/components/common";

import { useSquidStateStore, useSwapStore } from "~/store";

import { SwapStatus } from "~/utils/enums";

import { ProgressBar } from "../components";

export const SquidTxSummary = () => {
  const swapStatus = useSwapStore((state) => state.swapStatus);
  const statusResponse = useSquidStateStore((state) => state.statusResponse);

  function renderTxConfirmationInfo() {
    return (
      <div className="flex flex-col justify-center h-full text-base text-md gap-y-1">
        <h2 className="text-lg font-bold text-center">Swap Complete!</h2>
        <div className="my-0 divider" />
        <div>
          <a
            className="flex items-center text-primary hover:underline gap-x-2"
            href={statusResponse?.axelarTransactionUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span>{"Visit Axelarscan for more information"}</span>
            <Image
              src="/assets/ui/link.svg"
              height={16}
              width={16}
              alt="link"
            />
          </a>
        </div>
      </div>
    );
  }

  if (swapStatus !== SwapStatus.SQUID_FINISHED) {
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
                {renderTxConfirmationInfo()}
              </div>
            </div>
          </div>
        </div>
      </InputWrapper>
    </>
  );
};

export default SquidTxSummary;
