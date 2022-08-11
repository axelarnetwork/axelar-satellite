import React from "react";
import { useSwapStore } from "../../../store";
import { InputWrapper } from "../../common";
import { AXELARSCAN_URL } from "../../../config/constants";
import { ProgressBar } from "./parts";

export const ConfirmTransferState = () => {
  const { txInfo } = useSwapStore();

  function renderTxConfirmationInfo() {
    return (
      <div className="text-center">
        <div>Transfer on destination chain complete</div>
        <a
          className="text-primary"
          href={`${AXELARSCAN_URL}/transfer/${txInfo.sourceTxHash}`}
          target="_blank"
          rel="noreferrer nofollow noopener"
        >
          Visit axelarscan for more information
        </a>

        {/* {txInfo?.sourceTxHash && (
          <div className="flex justify-center mx-auto font-bold text-center text-info gap-x-2">
            <AddressShortener value={txInfo.sourceTxHash} />
            <div
              className="cursor-pointer"
              onClick={() => copyToClipboard(txInfo.sourceTxHash!)}
            >
              <Image src={"/assets/ui/copy.svg"} height={16} width={16} />
            </div>
          </div>
        )} */}
      </div>
    );
  }

  return (
    <InputWrapper className="h-40">
      <div className="h-full space-x-2">
        <div className="flex flex-col w-full h-full">
          <div className="h-full">
            <ProgressBar level={3} />

            <div className="flex items-center justify-center mt-6 text-xs gap-x-2">
              {renderTxConfirmationInfo()}
            </div>
          </div>
          <div className="w-full mt-auto">
            <div className="my-0 divider" />
            <div className="w-full text-xs font-medium text-center text-gray-500">
              Transaction completed
            </div>
          </div>
        </div>
      </div>
    </InputWrapper>
  );
};
