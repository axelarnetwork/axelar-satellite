import React from "react";
import Image from "next/image";
import { useSwapStore } from "../../../store";
import { AddressShortener, InputWrapper } from "../../common";
import { AXELARSCAN_URL } from "../../../config/constants";
import { ProgressBar } from "./parts";
import { copyToClipboard } from "../../../utils";

export const ConfirmTransferState = () => {
  const { depositAddress, destAddress, txInfo } = useSwapStore();

  function renderTxConfirmationInfo() {
    return (
      <div className="flex flex-col justify-center h-full text-sm text-center gap-y-1">
        <div>
          <h4>Deposit Address</h4>
          <div className="flex justify-center mx-auto font-bold text-center text-info gap-x-2">
            <AddressShortener value={depositAddress} />
            <div
              className="cursor-pointer"
              onClick={() => copyToClipboard(depositAddress)}
            >
              <Image src={"/assets/ui/copy.svg"} height={16} width={16} />
            </div>
          </div>
        </div>
        <div>
          <h4>Destination Address</h4>
          <div className="flex justify-center mx-auto font-bold text-center text-info gap-x-2">
            <AddressShortener value={destAddress} />
            <div
              className="cursor-pointer"
              onClick={() => copyToClipboard(destAddress)}
            >
              <Image src={"/assets/ui/copy.svg"} height={16} width={16} />
            </div>
          </div>
        </div>

        <div>
          <h4>Deposit Confirmation</h4>
          <div className="flex justify-center mx-auto font-bold text-center text-info gap-x-2">
            <AddressShortener value={txInfo.sourceTxHash} />
            <div className="flex items-center gap-x-2">
              <div
                className="cursor-pointer"
                onClick={() => copyToClipboard(txInfo.sourceTxHash!)}
              >
                <Image src={"/assets/ui/copy.svg"} height={16} width={16} />
              </div>
              <a
                href={`${AXELARSCAN_URL}/transfer/${txInfo.sourceTxHash}`}
                target="_blank"
                rel="noreferrer"
              >
                <Image src={"/assets/ui/link.svg"} height={16} width={16} />
              </a>
            </div>
          </div>
        </div>
        <div className="w-48 mx-auto my-1 text-xs divider"></div>
        <div>
          <a
            className="flex items-center text-primary hover:underline gap-x-2"
            href={`${AXELARSCAN_URL}/transfer/${txInfo.sourceTxHash}`}
            target="_blank"
            rel="noreferrer"
          >
            <span>Visit axelarscan for more information</span>
            <Image src={"/assets/ui/link.svg"} height={16} width={16} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <InputWrapper className="h-72">
      <div className="h-full space-x-2">
        <div className="flex flex-col w-full h-full">
          <div className="relative flex flex-col h-full">
            <ProgressBar level={3} />

            <div className="flex items-center justify-center h-full mt-auto text-xs gap-x-2">
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
